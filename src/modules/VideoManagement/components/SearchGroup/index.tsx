import { Dispatch, FC, memo } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Space } from 'antd';
import { isFuture } from 'date-fns';
import { debounce } from 'lodash';

import FormItem from 'components/FormItem';
import FormCheckbox from 'components/FormItem/components/Checkbox';
import FormRangePicker from 'components/FormItem/components/RangePicker';
import SearchInput from 'components/FormItem/components/SearchInput';
import SelectInput from 'components/FormItem/components/Select';
import useSearchBar from 'hooks/searchContainer/useSearchBar';
import { USER_FORM } from 'modules/UserManagement/constants';
import { VIDEO_FORM, VIDEO_FORM_DEFAULT_VALUE, VIDEO_STATUS_OPTION } from 'modules/VideoManagement/constants';

import { DEFAULT_SEARCH_PARAMS, SEARCH_TIME } from 'constant';
import IconReset from 'resources/svg/IconReset';

interface IProps {
  isChangePlaceholder?: boolean;
  searchParams?: any;
  setSearchParams?: Dispatch<any>;
  setSort?: Dispatch<any>;
}

const VideoSearchGroup: FC<IProps> = ({ isChangePlaceholder, searchParams, setSort, setSearchParams }) => {
  const { t } = useTranslation();

  const { resetForm, onSubmit, formContext } = useSearchBar({
    defaultValues: searchParams || VIDEO_FORM_DEFAULT_VALUE,
    defaultSearchParams: DEFAULT_SEARCH_PARAMS,
    formResetValues: VIDEO_FORM_DEFAULT_VALUE,
    setSort,
    setSearchParams,
  });

  const { setValue, getValues } = formContext;

  const debounceSearch = debounce(() => {
    setValue(USER_FORM.KEYWORD, getValues()[USER_FORM.KEYWORD].trim());
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
            <FormItem name={VIDEO_FORM.KEYWORD}>
              <SearchInput
                placeholder={isChangePlaceholder ? 'label.search_title_placeholder' : 'label.search_video_placeholder'}
                onSearch={onSubmit}
                onChange={debounceSearch}
              />
            </FormItem>
            <FormItem name={VIDEO_FORM.CREATED_DATE}>
              <FormRangePicker
                onCalendarChange={debounceRangeChange(VIDEO_FORM.CREATED_DATE)}
                disabledDate={(current) => isFuture(current)}
              />
            </FormItem>
            <FormItem name={VIDEO_FORM.STATUS}>
              <SelectInput
                options={VIDEO_STATUS_OPTION}
                onChange={onSubmit}
                showArrow
                placeholder='label.status_placeholder'
              />
            </FormItem>
            <FormItem name={USER_FORM.REPORTED}>
              <FormCheckbox className='banned-checkbox' onChange={onSubmit} checked={getValues()[VIDEO_FORM.REPORTED]}>
                {t('label.reported_videos')}
              </FormCheckbox>
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

export default memo(VideoSearchGroup);
