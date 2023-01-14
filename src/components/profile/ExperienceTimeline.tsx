import {
  Button,
  Select,
  Textarea,
  TextInput,
  Timeline,
  Tooltip,
} from 'flowbite-react';
import React, { ReactElement} from 'react';
import { HiPlusSm } from 'react-icons/hi';
import Check from './../../icons/Check.svg';
import { AccountantProfile, Experience, InErr } from '../../interfaces/User';
import { useTranslation } from 'react-i18next';

interface ExperienceTimelineProps {
  profile?: AccountantProfile;
  edit: boolean;
  inErr: InErr;
  setInErr(InErr);
  setProfile(profile: AccountantProfile);
}

export const ExperienceTimeline = ({
  profile,
  edit,
  inErr,
  setInErr,
  setProfile,
}: ExperienceTimelineProps): ReactElement => {
  const { t } = useTranslation();
  const monthNames = [
    t('Profile.months.january'),
    t('Profile.months.february'),
    t('Profile.months.march'),
    t('Profile.months.april'),
    t('Profile.months.may'),
    t('Profile.months.june'),
    t('Profile.months.july'),
    t('Profile.months.august'),
    t('Profile.months.september'),
    t('Profile.months.october'),
    t('Profile.months.november'),
    t('Profile.months.december'),
  ];

  const addColor = (isErr: boolean) => {
    return isErr ? { color: 'failure' } : {};
  };

  const defaultValueInvalid = (key: string) => {
    inErr[key] = true;
    setInErr({ ...inErr });
  };

  const createEmptyExperiece = (): Experience => {
    return {
      businessName: '',
      blurb: '',
      durationMonths: 0,
      durationYears: 0,
      jobTitle: '',
      startDate: { seconds: 0, nanoseconds: 0 },
      startDateObj: new Date(0),
      verified: false,
    };
  };

  return (
    <div className="flex flex-col">
      <h5 className="text-xl dark:text-white mb-1">{t('Profile.workExperience')}</h5>
      <Timeline className="mr-16">
        <>
          {profile
            ? profile.experiece.map((exp, i) => (

                <Timeline.Item key={i} className="sm:min-w-0 md:min-w-36">
                  <Timeline.Point />
                  <Timeline.Content>
                    <Timeline.Time>
                      {!edit ? (
                        `${
                          monthNames[exp.startDateObj.getUTCMonth()]
                        } ${exp.startDateObj.getUTCFullYear()} · ${
                          exp.durationYears
                        }y ${exp.durationMonths}m`
                      ) : (
                        <>
                          <div id="select" className="flex flex-row">
                            <Select
                              id={`workStartMonth${i}`}
                              required={true}
                              sizing="sm"
                              className="w-6/12"
                            >
                              <>
                                {monthNames.map((month, i) => {
                                  return (
                                    <option
                                      key={month}
                                      selected={
                                        exp.startDateObj.getUTCMonth() === i
                                      }
                                      onClick={() => {
                                        exp.startDateObj.setMonth(i);
                                        setProfile({ ...profile });
                                      }}
                                    >
                                      {month}
                                    </option>
                                  );
                                })}
                              </>
                            </Select>

                            <>
                            
                              <TextInput
                                id={`workStartYear${i}`}
                                type="text"
                                placeholder="Year started"
                                required={true}
                                defaultValue={exp.startDateObj
                                  .getUTCFullYear()
                                  .toString()}
                                sizing="sm"
                                {...addColor(inErr[`workStartYear${i}`])}
                                className="w-6/12"
                                onChange={(e) => {
                                  const year = Number(e.target.value);
                                  const thisyear = new Date().getUTCFullYear();

                                  if (
                                    !isNaN(year) &&
                                    year > 1950 &&
                                    year <= thisyear
                                  ) {
                                    const newDate = new Date(exp.startDateObj);
                                    newDate.setFullYear(year);
                                    exp.startDateObj = newDate;
                                    exp.startDate.seconds = newDate.getUTCSeconds()
                                    setProfile({ ...profile });

                                    inErr[`workStartYear${i}`] = false;
                                    setInErr({ ...inErr });
                                  } else {
                                    inErr[`workStartYear${i}`] = true;
                                    setInErr({ ...inErr });
                                  }
                                }}
                              />
                              {exp.startDateObj.getUTCFullYear() == 1970 &&
                              !(`workStartYear${i}` in inErr)
                                ? defaultValueInvalid(`workStartYear${i}`)
                                : null}
                            </>
                          </div>
                          <div id="select" className="flex flex-row mb-2">
                            <TextInput
                              id={`yearsWorked${i}`}
                              type="text"
                              placeholder="0"
                              required={true}
                              {...addColor(inErr[`yearsWorked${i}`])}
                              defaultValue={exp.durationYears}
                              value={exp.durationYears}
                              sizing="sm"
                              addon="y"
                              className="min-w-min"
                              onChange={(e) => {
                                const years = Number(e.target.value);
                                if (!isNaN(years) && years >= 0) {
                                  exp.durationYears = years;
                                  setProfile({ ...profile });

                                  inErr[`yearsWorked${i}`] = false;
                                  setInErr({ ...inErr });
                                } else {
                                  inErr[`yearsWorked${i}`] = true;
                                  setInErr({ ...inErr });
                                }
                              }}
                            />

                            <TextInput
                              id={`monthsWorked${i}`}
                              type="text"
                              placeholder="0"
                              required={true}
                              {...addColor(inErr[`monthsWorked${i}`])}
                              defaultValue={exp.durationMonths}
                              value={exp.durationMonths}
                              sizing="sm"
                              addon="m"
                              className="min-w-min"
                              onChange={(e) => {
                                const months = Number(e.target.value);
                                if (
                                  !isNaN(months) &&
                                  months >= 0 &&
                                  months < 12
                                ) {
                                  exp.durationMonths = months;
                                  setProfile({ ...profile });

                                  inErr[`monthsWorked${i}`] = false;
                                  setInErr({ ...inErr });
                                } else {
                                  inErr[`monthsWorked${i}`] = true;
                                  setInErr({ ...inErr });
                                }
                              }}
                            />
                          </div>
                        </>
                      )}
                    </Timeline.Time>
                    <Timeline.Title>
                      <div className="flex flex-row items-center">
                        {!edit ? (
                          exp.jobTitle
                        ) : (
                          <>

                            <TextInput
                              id={`jobTitle${i}`}
                              type="text"
                              className="w-full"
                              placeholder="Job Title"
                              required={true}
                              defaultValue={exp.jobTitle}
                              {...addColor(inErr[`jobTitle${i}`])}
                              value={exp.jobTitle}
                              sizing="sm"
                              onChange={(e) => {
                                const title = e.target.value;
                                exp.jobTitle = title;
                                setProfile({ ...profile });

                                if (!(title === '')) {
                                  inErr[`jobTitle${i}`] = false;
                                  setInErr({ ...inErr });
                                } else {
                                  inErr[`jobTitle${i}`] = true;
                                  setInErr({ ...inErr });
                                }
                              }}
                            />
                            {exp.jobTitle === '' && !(`jobTitle${i}` in inErr)
                              ? defaultValueInvalid(`jobTitle${i}`)
                              : null}
                          </>
                        )}
                        {exp.verified ? (
                          <Tooltip content="Verified" style="light">
                            <img src={Check} className="w-4 h-4" />
                          </Tooltip>
                        ) : null}
                      </div>
                    </Timeline.Title>
                    <Timeline.Title>
                      {!edit ? (
                        exp.businessName
                      ) : (
                        <>
                          <div className="mb-2 block"></div>
                          <TextInput
                            id={`companyName${i}`}
                            type="text"
                            placeholder="Company Name"
                            required={true}
                            defaultValue={exp.businessName}
                            {...addColor(inErr[`companyName${i}`])}
                            value={exp.businessName}
                            sizing="sm"
                            onChange={(e) => {
                              const businessName = e.target.value;
                              exp.businessName = businessName;
                              setProfile({ ...profile });

                              if (!(businessName === '')) {
                                inErr[`companyName${i}`] = false;
                                setInErr({ ...inErr });
                              } else {
                                inErr[`companyName${i}`] = true;
                                setInErr({ ...inErr });
                              }
                            }}
                          />
                          {exp.businessName === '' && !(`companyName${i}` in inErr)
                            ? defaultValueInvalid(`companyName${i}`)
                            : null}
                        </>
                      )}
                    </Timeline.Title>
                    <Timeline.Body>
                      {!edit ? (
                        exp.blurb
                      ) : (
                        <>
                          <div className="mb-2 block"></div>
                          <Textarea
                            id="comment"
                            placeholder="Description"
                            required={true}
                            rows={4}
                            defaultValue={exp.blurb}
                            value={exp.blurb}
                            onChange={(e) => {
                              const blurb = e.target.value;
                              exp.blurb = blurb;
                              setProfile({ ...profile });
                            }}
                          />
                        </>
                      )}
                    </Timeline.Body>
                    <Timeline.Body>
                      <div></div>
                    </Timeline.Body>
                  </Timeline.Content>
                </Timeline.Item>
              ))
            :                          
            null
            }
        </>
      </Timeline>
      {edit ? (
        <Button
          outline={true}
          pill={true}
          className="ml-2 w-18 h-18 self-center place-content-center"
          onClick={() => {
            const clone = structuredClone(profile);
            clone.experiece = [...clone.experiece, createEmptyExperiece()];
            setProfile(clone);
          }}
        >
          <HiPlusSm className="h-3 w-3" />
        </Button>
      ) : null}
    </div>
  );
}
