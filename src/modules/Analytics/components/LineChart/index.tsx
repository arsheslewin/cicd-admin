import React, { Dispatch, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Statistic, Tooltip, Typography } from 'antd';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';

import SelectInput from 'components/FormItem/components/Select';
import { LINE_CHART_COLOR, LINE_CHART_FIELD, STATISTICS_OPTION } from 'modules/Analytics/constants';

import IconQuestion from 'resources/svg/IconQuestion';

const { Title } = Typography;

interface IProps {
  data: any;
  setAnalyticsDate: Dispatch<any>;
}

const LineChart: React.FC<IProps> = ({ data, setAnalyticsDate }) => {
  const { t } = useTranslation();
  const lineRef = useRef<any>(null);
  const { dataLine, newUser, newVideo } = data || {};

  const onChange = (value: any) => setAnalyticsDate(value);

  useEffect(() => {
    // Create root element
    const root = am5.Root.new('chart_div');

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
      }),
    );

    // Add cursor
    const cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'none',
      }),
    );
    cursor.lineY.set('visible', false);

    // Create axis and renderer x
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 60,
    });

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: {
          timeUnit: 'day',
          count: 1,
        },
        startLocation: 0.5,
        endLocation: 0.5,
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    xRenderer.labels.template.set('paddingTop', 16);
    xRenderer.grid.template.set('location', 0.5);

    // Create axis and renderer y
    const yRenderer = am5xy.AxisRendererY.new(root, {});

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: yRenderer,
      }),
    );

    yRenderer.labels.template.set('paddingRight', 16);

    // Add series
    const series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: LINE_CHART_FIELD.VALUE,
        valueXField: LINE_CHART_FIELD.DATE,
        stroke: am5.color(LINE_CHART_COLOR.PRIMARY),
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      }),
    );

    // Add dot in line
    series.bullets.push(() => {
      const circle = am5.Circle.new(root, {
        fill: root.interfaceColors.get('background'),
        stroke: series.get('stroke'),
        strokeWidth: 2,
        radius: 4,
      });

      return am5.Bullet.new(root, {
        sprite: circle,
      });
    });

    // Set data
    lineRef.current = series;

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  useEffect(() => {
    if (dataLine?.length > 0) {
      lineRef.current.data.setAll(dataLine);
    }
  }, [JSON.stringify(dataLine)]);

  return (
    <section>
      <div className='flex justify-between items-center mb-30'>
        <Title level={1} className='!mb-0'>
          {t('common.analytics_dashboard')}
        </Title>
        <SelectInput
          options={STATISTICS_OPTION}
          defaultValue={STATISTICS_OPTION[0]}
          onChange={onChange}
          className='select-bg-white'
        />
      </div>
      <div className='flex justify-end gap-8'>
        <div className='flex flex-col gap-8'>
          <Statistic title={t('common.new_users')} value={newUser} className='container w-100' />
          <Statistic title={t('common.new_videos')} value={newVideo} className='container w-100' />
        </div>
        <div className='container'>
          <div className='flex items-center'>
            <h5 className='h5 mb-0 mr-2'>{t('common.active_users')}</h5>
            <Tooltip title={t('common.active_users_tooltip')}>
              <IconQuestion className='cursor-pointer' />
            </Tooltip>
          </div>
          <div id='chart_div' className='w-full h-100'></div>
        </div>
      </div>
    </section>
  );
};

export default LineChart;
