import { Dispatch, FC, memo } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Collapse, Space, Tooltip } from 'antd';
import { isFuture } from 'date-fns';
import { debounce } from 'lodash';

import FormItem from 'components/FormItem';
import FormCheckbox from 'components/FormItem/components/Checkbox';
import FormRangePicker from 'components/FormItem/components/RangePicker';
import SearchInput from 'components/FormItem/components/SearchInput';
import SelectInput from 'components/FormItem/components/Select';
import useSearchBar, { SEARCH_PANEL_KEY } from 'hooks/searchContainer/useSearchBar';
import { USER_FORM, USER_FORM_DEFAULT_VALUE, USER_STATUS_OPTION } from 'modules/UserManagement/constants';

import { DEFAULT_SEARCH_PARAMS, SEARCH_TIME } from 'constant';
import IconFilter from 'resources/svg/IconFilter';
import IconReset from 'resources/svg/IconReset';

const { Panel } = Collapse;

interface IProps {
  searchParams?: any;
  setSearchParams?: Dispatch<any>;
  setSort?: Dispatch<any>;
}

const UserSearchGroup: FC<IProps> = ({ searchParams, setSort, setSearchParams }) => {
  const { t } = useTranslation();

  const { resetForm, onSubmit, formContext, toggleFilter, activeKey } = useSearchBar({
    defaultValues: searchParams || USER_FORM_DEFAULT_VALUE,
    defaultSearchParams: DEFAULT_SEARCH_PARAMS,
    formResetValues: USER_FORM_DEFAULT_VALUE,
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
    <div className='form-container nft-list__form'>
      <FormProvider {...formContext}>
        <form autoComplete='off'>
          <Space size={18} wrap>
            <FormItem name={USER_FORM.KEYWORD}>
              <SearchInput
                placeholder={'label.search_user_placeholder'}
                onSearch={onSubmit}
                onChange={debounceSearch}
              />
            </FormItem>
            <Tooltip title={t('common.expand_filter')}>
              <Button className='form-button' onClick={toggleFilter}>
                <IconFilter />
              </Button>
            </Tooltip>
            <Button className='form-button' onClick={resetForm}>
              <IconReset />
            </Button>
          </Space>

          <Collapse ghost activeKey={activeKey}>
            <Panel header={null} key={SEARCH_PANEL_KEY}>
              <Space size={18} wrap>
                <FormItem name={USER_FORM.JOINED_DATE} label={t('label.joined_date')} horizontal>
                  <FormRangePicker
                    onCalendarChange={debounceRangeChange(USER_FORM.JOINED_DATE)}
                    disabledDate={(current) => isFuture(current)}
                  />
                </FormItem>
                <FormItem name={USER_FORM.LAST_LOGIN} label={t('label.last_login')} horizontal>
                  <FormRangePicker
                    onCalendarChange={debounceRangeChange(USER_FORM.LAST_LOGIN)}
                    disabledDate={(current) => isFuture(current)}
                  />
                </FormItem>
                <FormItem name={USER_FORM.STATUS}>
                  <SelectInput
                    options={USER_STATUS_OPTION}
                    onChange={onSubmit}
                    showArrow
                    placeholder='label.status_placeholder'
                  />
                </FormItem>
                <FormItem name={USER_FORM.REPORTED}>
                  <FormCheckbox
                    className='banned-checkbox'
                    onChange={onSubmit}
                    checked={getValues()[USER_FORM.REPORTED]}
                  >
                    {t('label.reported_users')}
                  </FormCheckbox>
                </FormItem>
              </Space>
            </Panel>
          </Collapse>
        </form>
      </FormProvider>
    </div>
  );
};

export default memo(UserSearchGroup);
