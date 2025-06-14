export interface APIResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

export enum SIZES {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum VARIANTS {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface QuestionOption {
  display: string;
  value: string | boolean;
  isRejection: boolean;
}

interface Question {
  question: string;
  type: 'ChoiceType';
  options: QuestionOption[];
}

interface Questionnaire {
  questions: Question[];
}

export interface QuestionnaireResponse extends APIResponse<Questionnaire> {
}