export enum REPORT_FORM {
  KEYWORD = 'keyword',
  CREATED_DATE = 'createdDate',
  REASON = 'reason',
  REPORTED = 'reportedObject',
}

export enum REPORT_QUERY {
  KEYWORD = 'keyword',
  SORT_FIELD = 'sortField',
  SORT_TYPE = 'sortType',
  LIMIT = 'limit',
  OFFSET = 'offset',
  CREATE_START_DATE = 'startDate',
  CREATE_END_DATE = 'endDate',
  REASON = 'reason',
  REPORTED_OBJECT = 'reportedObject',
  USER_ID = 'userId',
}

export enum REPORTED_OBJECTS {
  USER = 1,
  VIDEO = 2,
}

export const REPORT_FORM_DEFAULT_VALUE = {
  [REPORT_FORM.KEYWORD]: null,
  [REPORT_FORM.CREATED_DATE]: [],
};

export const REPORT_REASON_OPTION = [
  {
    value: null,
    name: 'reason_options.all',
  },
  {
    value: 'Intellectual property infringement',
    name: 'reason_options.intellectual',
  },
  {
    value: 'Violent content',
    name: 'reason_options.violent_content',
  },

  {
    value: 'Suicide, self-harm, eating disorders related content',
    name: 'reason_options.suicide_self',
  },
  {
    value: 'Nudity exposure or sexual content',
    name: 'reason_options.nudity_exposure',
  },
  {
    value: 'Bullying, harassment related content',
    name: 'reason_options.bullying_harassment',
  },
  {
    value: 'Malicious content',
    name: 'reason_options.malicious_content',
  },
  {
    value: 'Spam',
    name: 'reason_options.spam',
  },
  {
    value: 'Harmful false information',
    name: 'reason_options.harmful_information',
  },
  {
    value: 'Illegal information',
    name: 'reason_options.illegal_information',
  },
  {
    value: 'Others',
    name: 'reason_options.others',
  },
];

export const REPORTED_OBJECT = [
  {
    value: null,
    name: 'reported_object.all',
  },
  {
    value: REPORTED_OBJECTS.USER,
    name: 'reported_object.user',
  },
  {
    value: REPORTED_OBJECTS.VIDEO,
    name: 'reported_object.video',
  },
];
