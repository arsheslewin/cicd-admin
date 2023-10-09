import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';

import { Typography } from 'antd';

import SearchContainer from 'components/SearchContainer';
import SearchGroup from 'modules/UserManagement/components/SearchGroup';
import SearchTable from 'modules/UserManagement/components/SearchTable';
import useGetUserList from 'modules/UserManagement/hooks/useGetUserList';

import { DEFAULT_SEARCH_PARAMS } from 'constant';

const { Title } = Typography;

const UserManagement: FC = () => {
  const { t } = useTranslation();

  const [sort, setSort] = useState({});
  const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH_PARAMS);

  const { total, userList, isLoading } = useGetUserList(searchParams);

  const dataSource = useMemo(
    () =>
      userList?.map((item: any) => ({
        ...item,
        user: {
          avatar: item?.avatar,
          displayname: item?.displayname,
          username: item?.username,
        },
        action: {
          userId: item?.id,
        },
      })),
    [userList],
  );

  return (
    <div className='user-management'>
      <Title level={1}>{t('common.user_management')}</Title>
      <div className='container'>
        <SearchContainer sort={sort} searchParams={searchParams} setSort={setSort} setSearchParams={setSearchParams}>
          <SearchGroup />
          <span>
            <Title level={5}>
              {t('common.total_user')}: <NumericFormat displayType='text' value={total} thousandSeparator />
            </Title>
          </span>
          <SearchTable total={total} dataSource={dataSource} isLoading={isLoading} />
        </SearchContainer>
      </div>
    </div>
  );
};

export default UserManagement;
