import { Dispatch, FC, memo } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Space } from 'antd';
import { isFuture } from 'date-fns';
import { debounce } from 'lodash';

import FormItem from 'components/FormItem';
import FormRangePicker from 'components/FormItem/components/RangePicker';
import SearchInput from 'components/FormItem/components/SearchInput';
import useSearchBar from 'hooks/searchContainer/useSearchBar';
import { COMMENT_FORM, COMMENT_QUERY } from 'modules/VideoDetail/constants';
import { VIDEO_FORM_DEFAULT_VALUE } from 'modules/VideoManagement/constants';

import { DEFAULT_SEARCH_PARAMS, SEARCH_TIME } from 'constant';
import IconReset from 'resources/svg/IconReset';

interface IProps {
  searchParams?: any;
  setSearchParams?: Dispatch<any>;
  setSort?: Dispatch<any>;
}

const CommentSearchGroup: FC<IProps> = ({ searchParams, setSort, setSearchParams }) => {
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
    setValue(COMMENT_FORM.KEYWORD, getValues()[COMMENT_FORM.KEYWORD].trim());
    setSearchParams && setSearchParams((prev: any) => ({ ...prev, [COMMENT_QUERY.CURSOR_COMMENT_ID]: null }));
    onSubmit();
  }, SEARCH_TIME);

  const debounceRangeChange = (field: string) =>
    debounce(() => {
      setValue(field, getValues()[field]);
      setSearchParams && setSearchParams((prev: any) => ({ ...prev, [COMMENT_QUERY.CURSOR_COMMENT_ID]: null }));
      onSubmit();
    }, SEARCH_TIME);

  return (
    <div className='form-container'>
      <h5 className='h5 color-black'>{t('common.comments')}</h5>
      <FormProvider {...formContext}>
        <form autoComplete='off'>
          <Space size={18} wrap>
            <FormItem name={COMMENT_FORM.KEYWORD}>
              <SearchInput
                placeholder={'label.search_comment_placeholder'}
                onSearch={onSubmit}
                onChange={debounceSearch}
              />
            </FormItem>
            <FormItem name={COMMENT_FORM.CREATED_DATE}>
              <FormRangePicker
                onCalendarChange={debounceRangeChange(COMMENT_FORM.CREATED_DATE)}
                disabledDate={(current) => isFuture(current)}
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

export default memo(CommentSearchGroup);
