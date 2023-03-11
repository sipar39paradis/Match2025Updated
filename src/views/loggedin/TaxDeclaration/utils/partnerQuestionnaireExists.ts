import { ClientTypeEnum, Questionnaire } from '../types/Questionnaire/Questionnaire';

export function partnerQuestionnaireExists(questionnaires: Map<string, Questionnaire>) {
  let exist = false;
  questionnaires.forEach((questionnaire) => {
    if (questionnaire.clientType === ClientTypeEnum.PARTNER) {
      exist = true;
    }
  });
  return exist;
}