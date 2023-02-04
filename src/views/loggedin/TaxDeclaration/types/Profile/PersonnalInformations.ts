import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types'

export interface PersonalInformations {
title: TitleEnum
firstName: string
lastName: string
birthDay: DateRangeType
socialSecurityNumber: string
email: string
}

export enum TitleEnum {
  MR = 'mr' ,
  MRS = 'mrs'
}