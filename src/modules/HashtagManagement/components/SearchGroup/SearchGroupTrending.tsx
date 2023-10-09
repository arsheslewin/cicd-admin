import { Dispatch, FC, memo } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Space } from 'antd';
import { debounce } from 'lodash';

import FormItem from 'components/FormItem';
import FormCheckbox from 'components/FormItem/components/Checkbox';
import SearchInput from 'components/FormItem/components/SearchInput';
import SelectInput from 'components/FormItem/components/Select';
import useSearchBar from 'hooks/searchContainer/useSearchBar';
import { FORM_TRENDING, FORM_TRENDING_DEFAULT_VALUE, TRENDING_OPTION } from 'modules/HashtagManagement/constants';

import { DEFAULT_SEARCH_PARAMS, SEARCH_TIME } from 'constant';
import IconReset from 'resources/svg/IconReset';

interface IProps {
  searchParams?: any;
  setSearchParams?: Dispatch<any>;
  setSort?: Dispatch<any>;
}

const SearchGroupTrending: FC<IProps> = ({ searchParams, setSort, setSearchParams }) => {
  const { t } = useTranslation();

  const { resetForm, onSubmit, formContext } = useSearchBar({
    defaultValues: searchParams || FORM_TRENDING_DEFAULT_VALUE,
    defaultSearchParams: { ...DEFAULT_SEARCH_PARAMS, trendingDate: TRENDING_OPTION[0].value },
    formResetValues: FORM_TRENDING_DEFAULT_VALUE,
    setSort,
    setSearchParams,
  });

  const { setValue, getValues } = formContext;

  const debounceSearch = debounce(() => {
    setValue(FORM_TRENDING.KEYWORD, getValues()[FORM_TRENDING.KEYWORD].trim());
    onSubmit();
  }, SEARCH_TIME);

  return (
    <div className='form-container'>
      <FormProvider {...formContext}>
        <form autoComplete='off'>
          <Space size={18} wrap>
            <FormItem name={FORM_TRENDING.KEYWORD}>
              <SearchInput
                placeholder={'label.search_hashtag_placeholder'}
                onSearch={onSubmit}
                onChange={debounceSearch}
              />
            </FormItem>
            <FormItem name={FORM_TRENDING.TRENDING_DATE}>
              <SelectInput options={TRENDING_OPTION} defaultValue={TRENDING_OPTION[0]} onChange={onSubmit} showArrow />
            </FormItem>
            <FormItem name={FORM_TRENDING.IS_HIGHLIGHTED}>
              <FormCheckbox
                className='banned-checkbox'
                onChange={onSubmit}
                checked={getValues()[FORM_TRENDING.IS_HIGHLIGHTED]}
              >
                {t('label.highlighted_hashtag')}
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

export default memo(SearchGroupTrending);
