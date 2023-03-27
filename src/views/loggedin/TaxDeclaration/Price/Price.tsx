import React, { useContext, useEffect, useState } from 'react';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';
import { TaxDeclarationStep } from '../types/TaxReport/TaxDeclarationStep';
import CountUp from 'react-countup';
import {
  uploadFileToStorage,
  uploadTaxReportPdfToStorage,
} from '../../../../client/firebaseClient';
import { getPDFTaxReport } from '../../../../utils/FileMapper';
import { calculatePrice } from './calculatePrice';
import { personalInformationAsExcel } from '../../../../components/ExcelExport';
import { Questionnaire } from '../types/Questionnaire/Questionnaire';
import { Label, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { doc, getDoc } from 'firebase/firestore';
import { AppContext, AppContextType } from '../../../../context/AppContext';

type PromoCodeData = {
  promoCode: string;
};

export interface PromoCode {
  active: boolean;
  discount: number;
  type: 'percentage' | 'value';
}

export function Price() {
  const { questionnaires, setSearchParams } = useContext(
    QuestionnaireContext
  ) as QuestionnaireContextType;
  const { firestore } = useContext(AppContext) as AppContextType;
  const [price, setPrice] = useState<number | undefined>();
  const [discountedPrice, SetDiscountedPrice] = useState<number | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PromoCodeData>();

  useEffect(() => {
    setPrice(calculatePrice(questionnaires));
  }, []);

  const handleExportToExcel = async (individualFormData: Questionnaire) => {
    const excelData = await personalInformationAsExcel(
      individualFormData,
      price,
      discountedPrice
    );
    await uploadFileToStorage(
      'TaxReportCsv.xlsx',
      excelData,
      individualFormData?.personalInformations
    );
  };

  function calculateDiscount(promoCode: PromoCode) {
    if (promoCode.active) {
      if (promoCode.type === 'percentage') {
        const percentageDiscount = 1 - promoCode.discount / 100;
        SetDiscountedPrice(price * percentageDiscount);
      } else {
        SetDiscountedPrice(price - promoCode.discount);
      }
    } else {
      setError('promoCode', { message: 'Code de promotion expiré' });
    }
  }

  async function onSubmit(data: PromoCodeData) {
    const docRef = doc(firestore, 'PromoCodes', data.promoCode);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      calculateDiscount(docSnap.data() as PromoCode);
    } else {
      setError('promoCode', { message: 'Code de promotion invalide' });
    }
  }

  return (
    <section className="flex flex-col align-baseline items-start w-full">
      <h1>Merci d’avoir rempli notre questionnaire. </h1>
      <p className="font-semibold">
        Voici votre prix* 100% adapté à votre situation :
      </p>

      <div className="h-48 w-full flex items-center">
        <h1
          className={`text-center w-full text-8xl ${
            discountedPrice ? 'line-through' : ''
          }`}
        >
          <CountUp end={price} />$
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2 block">
          <Label
            value="Vous avez un code promotionnel ?"
            className="font-semibold"
          />
        </div>
        <div className="flex flex-row gap-4 mb-4">
          <TextInput
            placeholder="Code promotionnel"
            {...register('promoCode')}
          />
          <input
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-full text-sm md:w-fit md:text-base"
            value="Appliquer"
          ></input>
        </div>
        {errors?.promoCode && (
          <p className="text-red text-red-500">{errors.promoCode?.message}</p>
        )}
      </form>

      {discountedPrice && (
        <>
          <p className="a font-semibold">Voici votre nouveau prix* :</p>
          <div className="h-48 w-full flex items-center">
            <h1 className="text-center w-full text-8xl text-green-700">
              <CountUp end={discountedPrice} decimals={2} />$
            </h1>
          </div>
        </>
      )}

      <p className="self-end text-gray-500">*Taxes en sus</p>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
      <div className="w-full flex justify-between mt-4 flex-wrap gap-2">
        <input
          type="submit"
          value="Retour aux questionnaires"
          onClick={() => {
            setSearchParams({
              step: TaxDeclarationStep.DEDUCTIONS_AND_TAX_CREDIT,
            });
          }}
          className="bg-[#222C40] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded cursor-pointer w-full text-sm md:w-fit md:text-base"
        />
        <input
          type="submit"
          value="Accepter et déposer les fichiers"
          onClick={() => {
            questionnaires?.forEach((value) => {
              uploadTaxReportPdfToStorage(
                getPDFTaxReport(value?.taxReport, value?.personalInformations),
                value?.personalInformations
              );
              handleExportToExcel(value);
            });
            setSearchParams({
              step: TaxDeclarationStep.UPLOAD_FILES,
            });
          }}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-full text-sm md:w-fit md:text-base"
        />
      </div>
    </section>
  );
}
