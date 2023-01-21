import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types'

export interface PersonalInformations {
title: TitleEnum
firstName: string
lastName: string
initial?: string
birthDay: DateRangeType
socialSecurityNumber: string
email: string
deathDate?: DateRangeType 
}

export enum TitleEnum {
  MR = 'mr' ,
  MRS = 'mrs'
}