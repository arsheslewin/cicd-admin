import { Dispatch, useState } from 'react';
import { useForm } from 'react-hook-form';

import { DEFAULT_SEARCH_PARAMS } from 'constant';

export const SEARCH_PANEL_KEY = '1';

const useSearchBar = ({
  defaultValues,
  defaultSearchParams,
  formResetValues,
  defaultSort = {},
  setSort,
  setSearchParams,
  resolver,
}: {
  defaultValues: any;
  defaultSearchParams: any;
  defaultSort?: any;
  resolver?: any;
  formResetValues?: any;
  setSort?: Dispatch<any>;
  setSearchParams?: Dispatch<any>;
}) => {
  const [activeKey, setActiveKey] = useState<string[]>([]);

  const formContext = useForm({
    defaultValues,
    resolver,
  });
  const { handleSubmit, reset } = formContext;

  const toggleFilter = () => {
    setActiveKey((activeKey) => (activeKey.length > 0 ? [] : [SEARCH_PANEL_KEY]));
  };

  const resetForm = () => {
    if (formResetValues) reset(formResetValues);
    else reset();
    setSort && setSort(defaultSort);
    setSearchParams && setSearchParams(defaultSearchParams);
  };

  const onSubmit = () => {
    handleSubmit((searchParams) => {
      setSearchParams &&
        setSearchParams((previousSearchParams: any) => ({
          ...previousSearchParams,
          ...searchParams,
          page: defaultSearchParams?.page || DEFAULT_SEARCH_PARAMS.page,
        }));
    })();
  };

  return {
    resetForm,
    onSubmit,
    formContext,
    toggleFilter,
    activeKey,
  };
};

export default useSearchBar;
