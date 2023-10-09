import { Dispatch, FC, memo } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Space } from 'antd';
import { isFuture } from 'date-fns';
import { debounce } from 'lodash';

import FormItem from 'components/FormItem';
import FormRangePicker from 'components/FormItem/components/RangePicker';
import SearchInput from 'components/FormItem/components/SearchInput';
import SelectInput from 'components/FormItem/components/Select';
import useSearchBar from 'hooks/searchContainer/useSearchBar';
import {
  REPORT_FORM,
  REPORT_FORM_DEFAULT_VALUE,
  REPORT_REASON_OPTION,
  REPORTED_OBJECT,
} from 'modules/ReportManagement/constants';

import { DEFAULT_SEARCH_PARAMS, SEARCH_TIME } from 'constant';
import IconReset from 'resources/svg/IconReset';

interface IProps {
  searchParams?: any;
  setSearchParams?: Dispatch<any>;
  setSort?: Dispatch<any>;
}

const ReportSearchGroup: FC<IProps> = ({ searchParams, setSort, setSearchParams }) => {
  const { t } = useTranslation();

  const { resetForm, onSubmit, formContext } = useSearchBar({
    defaultValues: searchParams || REPORT_FORM_DEFAULT_VALUE,
    defaultSearchParams: DEFAULT_SEARCH_PARAMS,
    formResetValues: REPORT_FORM_DEFAULT_VALUE,
    setSort,
    setSearchParams,
  });

  const { setValue, getValues } = formContext;

  const debounceSearch = debounce(() => {
    setValue(REPORT_FORM.KEYWORD, getValues()[REPORT_FORM.KEYWORD].trim());
    onSubmit();
  }, SEARCH_TIME);

  const debounceRangeChange = (field: string) =>
    debounce(() => {
      setValue(field, getValues()[field]);
      onSubmit();
    }, SEARCH_TIME);

  return (
    <div className='form-container'>
      <FormProvider {...formContext}>
        <form autoComplete='off'>
          <Space size={18} wrap>
            <FormItem name={REPORT_FORM.KEYWORD}>
              <SearchInput
                placeholder={'label.search_report_placeholder'}
                onSearch={onSubmit}
                onChange={debounceSearch}
              />
            </FormItem>
            <FormItem name={REPORT_FORM.CREATED_DATE}>
              <FormRangePicker
                onCalendarChange={debounceRangeChange(REPORT_FORM.CREATED_DATE)}
                disabledDate={(current) => isFuture(current)}
              />
            </FormItem>
            <FormItem name={REPORT_FORM.REASON}>
              <SelectInput
                options={REPORT_REASON_OPTION}
                onChange={onSubmit}
                showArrow
                placeholder='label.reason_placeholder'
              />
            </FormItem>
            <FormItem name={REPORT_FORM.REPORTED}>
              <SelectInput
                options={REPORTED_OBJECT}
                onChange={onSubmit}
                showArrow
                placeholder='label.reported_object_placeholder'
              />
            </FormItem>
            <Button className='form-button mt-4' onClick={resetForm}>
              <IconReset />
            </Button>
          </Space>
        </form>
      </FormProvider>
    </div>
  );
};

export default memo(ReportSearchGroup);
