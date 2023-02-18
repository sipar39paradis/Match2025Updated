import {  DateType } from 'react-tailwindcss-datepicker/dist/types'

export interface ContactDetails {
  address: string
  appartment?: number
  street: string
  city: string
  postal: string
  movedFromOtherProvince: DateType
  sameAddress: boolean
  differentProvince?: ProvinceEnum
  phoneNumber: string
  bankruptcy: boolean
  disabled: boolean
  firstTimeARC: boolean
  canadianRedisentStatusChange: boolean
  canadianIncomes: number
  foreignIncomes: number
  residentStatus: ResidentStatusEnum
  nonResidentRevenues: number
}

export enum ProvinceEnum {
  ALBERTA = 'alberta',
  BRITISH_COLUMBIA = 'britishColumbia',
  ONTARIO = 'ontario',
  QUEBEC = 'quebec',
  NOVA_SCOTIA = 'novaScotia',
  NEW_BRUNSWICK = 'newBrunsick',
  MANITOBA = 'manitoba',
  PRINCE_EDWARD_ISLAND = 'princeEdwardIsland',
  SASKATCHEWAN = 'saskatchewan',
  NEWFOUND_LAND = 'newfoundland'
}

export enum ResidentStatusEnum {
  NEW_RESIDENT,
  TEMPORARY_STAY,
  FOREIGN_AGRICULTURAL_WORKER, 
  FOREIGN_STUDENT,
  EMIGRANT,
  TEMPORARY_STAY_OUTSIDE_CANADA,
  OTHER_SITUATION
}