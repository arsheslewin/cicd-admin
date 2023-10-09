import type { FC } from 'react';
import { ControllerRenderProps, useFormContext } from 'react-hook-form';

import generatePicker from 'antd/es/date-picker/generatePicker';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

import type { RangePickerProps } from 'antd/lib/date-picker/generatePicker';

import { DEFAULT_SEARCH_DATE_FORMAT } from 'constant';
import CalendarIcon from 'resources/svg/CalendarIcon';

const { RangePicker } = DatePicker;

interface IFormRangePicker {
  field?: ControllerRenderProps<any, string>;
  onChange?: (value: Date | null) => void;
}

const FormRangePicker: FC<RangePickerProps<Date> & IFormRangePicker> = ({ field, onChange, ...props }) => {
  const { trigger } = useFormContext();

  const handleChange = (dates: any) => {
    field?.onChange(dates);
    trigger(field?.name);
    if (onChange) onChange(dates);
  };

  return (
    <RangePicker
      allowEmpty={[true, true]}
      inputReadOnly
      format={DEFAULT_SEARCH_DATE_FORMAT}
      {...field}
      {...props}
      onChange={handleChange}
      suffixIcon={<CalendarIcon />}
    />
  );
};

export default FormRangePicker;
