export enum HEATMAP_FIELD {
  WEEKDAY = 'weekday',
  HOUR = 'hour',
  VALUE = 'value',
}

export enum LINE_CHART_FIELD {
  DATE = 'date',
  VALUE = 'value',
}

export enum CONVERT_HOUR {
  '1am' = 0,
  '2am' = 1,
  '3am' = 2,
  '4am' = 3,
  '5am' = 4,
  '6am' = 5,
  '7am' = 6,
  '8am' = 7,
  '9am' = 8,
  '10am' = 9,
  '11am' = 10,
  '12am' = 11,
  '1pm' = 12,
  '2pm' = 13,
  '3pm' = 14,
  '4pm' = 15,
  '5pm' = 16,
  '6pm' = 17,
  '7pm' = 18,
  '8pm' = 19,
  '9pm' = 20,
  '10pm' = 21,
  '11pm' = 22,
  '12pm' = 23,
}

export enum CONVERT_WEEKDAY {
  'Sunday' = 0,
  'Monday' = 1,
  'Tuesday' = 2,
  'Wednesday' = 3,
  'Thursday' = 4,
  'Friday' = 5,
  'Saturday' = 6,
}

export const HEATMAP_COLOR = {
  STROKE: '#ffffff',
  MIN: '#fffb77',
  MAX: '#fe131a',
};

export const LINE_CHART_COLOR = {
  PRIMARY: '#374BFF',
};

export enum STATISTICS_DATE {
  LAST_7_DAYS = 7,
  LAST_30_DAYS = 30,
  LAST_120_DAYS = 120,
}

export const STATISTICS_OPTION = [
  {
    value: STATISTICS_DATE.LAST_7_DAYS,
    name: 'common.last_7_day',
  },
  {
    value: STATISTICS_DATE.LAST_30_DAYS,
    name: 'common.last_30_day',
  },
  {
    value: STATISTICS_DATE.LAST_120_DAYS,
    name: 'common.last_120_day',
  },
];
