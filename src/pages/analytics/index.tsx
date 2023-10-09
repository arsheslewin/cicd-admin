import React, { useMemo, useState } from 'react';

import moment from 'moment';

import Heatmap from 'modules/Analytics/components/Heatmap';
import LineChart from 'modules/Analytics/components/LineChart';
import { CONVERT_HOUR, CONVERT_WEEKDAY, STATISTICS_OPTION } from 'modules/Analytics/constants';
import useFetchAnalytic from 'modules/Analytics/hooks/useFetchAnalytics';

const Analytics: React.FC = () => {
  const [analyticsDate, setAnalyticsDate] = useState(STATISTICS_OPTION[0].value);
  const { data } = useFetchAnalytic(analyticsDate);
  const { activeUsers, newUser, newVideo, watchedVideos } = data || {};

  const dataLine = useMemo(
    () =>
      activeUsers?.map((e: any) => ({
        date: moment(e?.date, 'DD-MM-YYYY').toDate().getTime(),
        value: Number(e?.value),
      })),
    [activeUsers],
  );

  const dataHeatmap = useMemo(() => {
    const convertTimeLocal = watchedVideos
      ?.map((e: any) => ({
        ...e,
        hour: moment.utc(e?.hour, 'HH').local().format('HH'),
      }))
      // sort Sunday -> Saturday , 1am -> 12pm (local time)
      .sort((a: any, b: any) => a?.weekday - b?.weekday || a?.hour - b?.hour);

    return convertTimeLocal?.map((e: any) => ({
      weekday: CONVERT_WEEKDAY[Number(e?.weekday)],
      hour: CONVERT_HOUR[Number(e?.hour)],
      value: Number(e?.value),
    }));
  }, [watchedVideos]);

  return (
    <div className='analytics'>
      <LineChart data={{ dataLine, newUser, newVideo }} setAnalyticsDate={setAnalyticsDate} />
      <Heatmap data={dataHeatmap} />
    </div>
  );
};

export default Analytics;
