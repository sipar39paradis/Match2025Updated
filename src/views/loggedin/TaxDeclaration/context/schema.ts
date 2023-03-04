import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const sinRegExp = /^^(\d{3}-\d{3}-\d{3})|(\d{9})$/
const postalCodeRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i

export const personalInformationsSchema = Yup.object({
  firstName: Yup.string().required('Le prénom est requis'),
  lastName: Yup.string().required('Le nom de famille est requis'),
  email: Yup.string()
    .email()
    .min(6, "L'adresse courriel doit être au moins 6 caractères"),
  socialInsuranceNumber: Yup.string()
    .required("Le numéro d'assurance social est requis")
    .matches(sinRegExp, 'Le format doit être XXX-XXX-XXX'),
  birthDay: Yup.string().required('La date de naissance est requise'),
});

export const contactDetailsSchema = Yup.object({
  address: Yup.string().required('L\'adresse est requise'),
    city: Yup.string().required('La ville est requise'),
    postal: Yup.string().required('Le code postal est requis').matches(postalCodeRegex, 'Le format du code postal doit être XXX-XXX'),
    phoneNumber: Yup.string().required('Le numéro de téléphone est requis').matches(phoneRegExp, 'Le format du numéro de téléphone doit être XXX XXX-XXXX'),
});