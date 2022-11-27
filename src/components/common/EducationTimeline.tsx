import {
  Badge,
  Button,
  Card,
  Dropdown,
  Rating,
  Select,
  Textarea,
  TextInput,
  Timeline,
  Tooltip,
} from 'flowbite-react';
import React, { ReactElement, ReactNode, useEffect, useRef } from 'react';
import { HiPlusSm } from 'react-icons/hi';
import Check from './../../icons/Check.svg';
import {
  AccountantProfile,
  Experience,
  Schooling,
} from '../../interfaces/User';

interface EducationTimelineProps {
  profile?: AccountantProfile;
  edit: boolean;
  inErr: any;
  setInErr(any);
  setProfile(profile: AccountantProfile);
}

export function EducationTimeline({
  profile,
  edit,
  inErr,
  setInErr,
  setProfile,
}: EducationTimelineProps): ReactElement {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const addColor = (isErr: boolean) => {
    return isErr ? { color: 'failure' } : {};
  };

  const defaultValueInvalid = (key: string) => {
    inErr[key] = true;
    setInErr({ ...inErr });
  };

  const createEmptySchool = (): Schooling => {
    return {
      blurb: '',
      degree: '',
      graduationDate: { seconds: 0, nanoseconds: 0 },
      graduationDateObj: new Date(0),
      school: '',
      verified: false,
    };
  };

  return (
    <div className="flex flex-col">
      <h5 className="text-xl dark:text-white mb-1">Education</h5>
      <Timeline className="mr-16">
        <>
          {profile
            ? profile.schooling.map((edu, i) => (
                <Timeline.Item key={i} className="sm:min-w-0 md:min-w-36">
                  <Timeline.Point />
                  <Timeline.Content>
                    <Timeline.Time>
                      {!edit ? (
                        `Graduated ${
                          monthNames[edu.graduationDateObj.getUTCMonth()]
                        } ${edu.graduationDateObj.getUTCFullYear()}`
                      ) : (
                        <>
                          Graduated
                          <div id="select" className="flex flex-row">
                            <Select
                              id={`eduMonth${i}`}
                              required={true}
                              sizing="sm"
                              className="min-w-max"
                            >
                              <>
                                {monthNames.map((month, i) => {
                                  return (
                                    <option
                                      key={month}
                                      selected={
                                        edu.graduationDateObj.getUTCMonth() ===
                                        i
                                      }
                                      onClick={() => {
                                        edu.graduationDateObj.setMonth(i);
                                        setProfile({ ...profile });
                                      }}
                                    >
                                      {month}
                                    </option>
                                  );
                                })}
                              </>
                            </Select>
                          </div>
                          <TextInput
                            id={`eduYear${i}`}
                            type="email"
                            placeholder="Year Graduated"
                            required={true}
                            defaultValue={edu.graduationDateObj.getUTCFullYear()}
                            sizing="sm"
                            {...addColor(inErr[`eduYear${i}`])}
                            className="min-w-min"
                            onChange={(e) => {
                              const year = Number(e.target.value);
                              const thisyear = new Date().getUTCFullYear();
                              if (
                                !isNaN(year) &&
                                year > 1950 &&
                                year <= thisyear
                              ) {
                                edu.graduationDateObj.setFullYear(year);
                                setProfile({ ...profile });

                                inErr[`eduYear${i}`] = false;
                                setInErr({ ...inErr });
                              } else {
                                inErr[`eduYear${i}`] = true;
                                setInErr({ ...inErr });
                              }
                            }}
                          />
                            {edu.graduationDateObj.getUTCFullYear() == 1970 &&
                              !(`eduYear${i}` in inErr)
                                ? defaultValueInvalid(`eduYear${i}`)
                                : null}
                        </>
                      )}
                    </Timeline.Time>
                    <Timeline.Title>
                      <div className="flex flex-row items-center justify-between">
                        {!edit ? (
                          edu.degree
                        ) : (
                          <>
                            <div className="mb-2 block"></div>
                            <TextInput
                              id={`degree${i}`}
                              type="text"
                              placeholder="Degree"
                              required={true}
                              defaultValue={edu.degree}
                              {...addColor(inErr[`degree${i}`])}
                              sizing="sm"
                              onChange={(e) => {
                                const degree = e.target.value;
                                edu.degree = degree;
                                setProfile({ ...profile });

                                if (!(degree === '')) {
                                  inErr[`degree${i}`] = false;
                                  setInErr({ ...inErr });
                                } else {
                                  inErr[`degree${i}`] = true;
                                  setInErr({ ...inErr });
                                }
                              }}
                            />
                            {edu.degree === '' && !(`degree${i}` in inErr)
                              ? defaultValueInvalid(`degree${i}`)
                              : null}
                          </>
                        )}
                        {edu.verified ? (
                          <Tooltip content="Verified" style="light">
                            <img src={Check} className="w-4 h-4" />
                          </Tooltip>
                        ) : null}
                      </div>
                    </Timeline.Title>
                    <Timeline.Title>
                      {!edit ? (
                        edu.school
                      ) : (
                        <>
                          <div className="mb-2 block"></div>
                          <TextInput
                            id={`school${i}`}
                            type="email"
                            placeholder="School"
                            required={true}
                            defaultValue={edu.school}
                            {...addColor(inErr[`school${i}`])}
                            sizing="sm"
                            onChange={(e) => {
                              const school = e.target.value;
                              edu.school = school;
                              setProfile({ ...profile });

                              if (!(school === '')) {
                                inErr[`school${i}`] = false;
                                setInErr({ ...inErr });
                              } else {
                                inErr[`school${i}`] = true;
                                setInErr({ ...inErr });
                              }
                            }}
                          />
                          {edu.school === '' && !(`school${i}` in inErr)
                            ? defaultValueInvalid(`school${i}`)
                          : null}
                        </>
                      )}
                    </Timeline.Title>
                    <Timeline.Body>
                      {!edit ? (
                        edu.blurb
                      ) : (
                        <>
                          <div className="mb-2 block"></div>
                          <Textarea
                            id={`blurb${i}`}
                            placeholder="Description"
                            required={true}
                            rows={4}
                            defaultValue={edu.blurb}
                            onChange={(e) => {
                              const blurb = e.target.value;
                              edu.blurb = blurb;
                              setProfile({ ...profile });
                            }}
                          />
                        </>
                      )}
                    </Timeline.Body>
                  </Timeline.Content>
                </Timeline.Item>
              ))
            : null}
        </>
      </Timeline>
      {edit ? (
        <Button
          outline={true}
          pill={true}
          className="ml-2 w-18 h-18 self-center place-content-center"
          onClick={() => {
            const clone = structuredClone(profile);
            clone.schooling = [...clone.schooling, createEmptySchool()];
            setProfile(clone);
          }}
        >
          <HiPlusSm className="h-3 w-3" />
        </Button>
      ) : null}
    </div>
  );
}
