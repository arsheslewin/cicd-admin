import React, { Dispatch, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Col, Row } from 'antd';

import SelectInput from 'components/FormItem/components/Select';
import { TRENDING_OPTION } from 'modules/HashtagManagement/constants';

import { numberFormatter } from 'utils';

interface IProps {
  detail: any;
  setSearchParams: Dispatch<any>;
}

const HashtagInsights: React.FC<IProps> = ({ detail, setSearchParams }) => {
  const { t } = useTranslation();
  const { allTimeData, selectTime } = detail || {};

  const [value, setValue] = useState(TRENDING_OPTION[0]?.value);

  const onChange = (value: any) => {
    setSearchParams((prev: any) => ({ ...prev, trendingDate: value }));
    setValue(value);
  };

  const getSelectTime = () => {
    const name = TRENDING_OPTION.find((item: any) => item?.value === value)?.name;
    return t(name as string);
  };

  return (
    <section className='hashtag-insights px-40 mt-10'>
      <Row align='top' justify='space-between'>
        <h5 className='h5 color-black'>{t('common.hashtag_highlighted')}</h5>
        <div className='flex insight-select'>
          <SelectInput options={TRENDING_OPTION} defaultValue={TRENDING_OPTION[0]} onChange={onChange} />
        </div>
      </Row>

      <Row gutter={30}>
        <Col span={12}>
          <div className='insight-card container'>
            <div className='insight-card__title'>{t('column.total_videos')}</div>
            <div className='flex justify-between items-center'>
              <div className='insight-card__value'>
                <div>{numberFormatter(selectTime?.totalVideo)}</div>
                <div>{getSelectTime()}</div>
              </div>
              <div className='color-black text-2xl'>/</div>
              <div className='insight-card__value'>
                <div>{numberFormatter(allTimeData?.totalVideo)}</div>
                <div>Overall</div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className='insight-card container'>
            <div className='insight-card__title'>{t('column.total_views')}</div>
            <div className='flex justify-between items-center'>
              <div className='insight-card__value'>
                <div>{numberFormatter(selectTime?.totalView)}</div>
                <div>{getSelectTime()}</div>
              </div>
              <div className='color-black text-2xl'>/</div>
              <div className='insight-card__value'>
                <div>{numberFormatter(allTimeData?.totalView)}</div>
                <div>Overall</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default HashtagInsights;
