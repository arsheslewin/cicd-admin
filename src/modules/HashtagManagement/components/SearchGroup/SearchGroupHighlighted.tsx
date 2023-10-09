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
import {
  FORM_HIGHLIGHTED,
  FORM_HIGHLIGHTED_DEFAULT_VALUE,
  HIGHLIGHT_OPTION,
} from 'modules/HashtagManagement/constants';
import { useHashtagActions } from 'store/hashtag-management/selector';

import { DEFAULT_SEARCH_PARAMS, SEARCH_TIME } from 'constant';
import IconReset from 'resources/svg/IconReset';

interface IProps {
  searchParams?: any;
  setSearchParams?: Dispatch<any>;
  setSort?: Dispatch<any>;
  setDataSource: Dispatch<any>;
}

const SearchGroupHighlighted: FC<IProps> = ({ searchParams, setSearchParams, setSort, setDataSource }) => {
  const { t } = useTranslation();

  const { resetForm, onSubmit, formContext } = useSearchBar({
    defaultValues: searchParams || FORM_HIGHLIGHTED_DEFAULT_VALUE,
    defaultSearchParams: DEFAULT_SEARCH_PARAMS,
    formResetValues: FORM_HIGHLIGHTED_DEFAULT_VALUE,
    setSort,
    setSearchParams,
  });

  const { setValue, getValues } = formContext;

  const { setHighlighted } = useHashtagActions();

  const clearData = () => {
    setHighlighted({ list: [], total: 0 });
    setDataSource([]);
  };

  const onSubmitForm = () => {
    clearData();
    onSubmit();
  };

  const debounceSearch = debounce(() => {
    setValue(FORM_HIGHLIGHTED.KEYWORD, getValues()[FORM_HIGHLIGHTED.KEYWORD].trim());
    onSubmitForm();
  }, SEARCH_TIME);

  const reset = () => {
    clearData();
    resetForm();
  };

  return (
    <div className='form-container'>
      <FormProvider {...formContext}>
        <form autoComplete='off'>
          <Space size={18} wrap>
            <FormItem name={FORM_HIGHLIGHTED.KEYWORD}>
              <SearchInput placeholder={'label.search_hashtag_placeholder'} onChange={debounceSearch} />
            </FormItem>
            <FormItem name={FORM_HIGHLIGHTED.CREATED_BY}>
              <SelectInput
                options={HIGHLIGHT_OPTION}
                onChange={onSubmitForm}
                showArrow
                placeholder='label.created_by_placeholder'
              />
            </FormItem>
            <FormItem name={FORM_HIGHLIGHTED.IS_DISPLAYED}>
              <FormCheckbox
                className='banned-checkbox'
                onChange={onSubmitForm}
                checked={getValues()[FORM_HIGHLIGHTED.IS_DISPLAYED]}
              >
                {t('label.displayed_hashtag')}
              </FormCheckbox>
            </FormItem>
            <Button className='form-button mt-4' onClick={reset}>
              <IconReset />
            </Button>
          </Space>
        </form>
      </FormProvider>
    </div>
  );
};

export default memo(SearchGroupHighlighted);
