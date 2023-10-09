import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from 'antd';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';

import { HEATMAP_COLOR, HEATMAP_FIELD } from 'modules/Analytics/constants';

import IconQuestion from 'resources/svg/IconQuestion';

interface IProps {
  data: any;
}

const Heatmap: React.FC<IProps> = ({ data = [] }) => {
  const { t } = useTranslation();

  useEffect(() => {
    // Create root element
    const root = am5.Root.new('heatmap_div');

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
        layout: root.verticalLayout,
      }),
    );

    // Create axes and their renderers
    const yRenderer = am5xy.AxisRendererY.new(root, {
      visible: false,
      minGridDistance: 20,
      inversed: true,
    });

    yRenderer.grid.template.set('visible', false);

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        renderer: yRenderer,
        categoryField: HEATMAP_FIELD.WEEKDAY,
      }),
    );

    const xRenderer = am5xy.AxisRendererX.new(root, {
      visible: false,
      minGridDistance: 30,
      opposite: true,
    });

    xRenderer.grid.template.set('visible', false);

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: xRenderer,
        categoryField: HEATMAP_FIELD.HOUR,
      }),
    );

    // Set label
    const allYGroups = [...new Set(data?.map((d: any) => d.weekday))].map((d) => ({ weekday: d }));
    const allXGroups = [...new Set(data?.map((d: any) => d.hour))].map((d) => ({ hour: d }));

    yAxis.data.setAll(allYGroups);
    xAxis.data.setAll(allXGroups);

    // Create series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        calculateAggregates: true,
        stroke: am5.color(HEATMAP_COLOR.STROKE),
        clustered: false,
        xAxis: xAxis,
        yAxis: yAxis,
        categoryXField: HEATMAP_FIELD.HOUR,
        categoryYField: HEATMAP_FIELD.WEEKDAY,
        valueField: HEATMAP_FIELD.VALUE,
      }),
    );

    // Create tooltip in series
    series.columns.template.setAll({
      tooltipText: '{value}',
      strokeOpacity: 1,
      strokeWidth: 2,
      width: am5.percent(100),
      height: am5.percent(100),
    });

    // Set up heat rules
    series.set('heatRules', [
      {
        target: series.columns.template,
        min: am5.color(HEATMAP_COLOR.MIN),
        max: am5.color(HEATMAP_COLOR.MAX),
        dataField: HEATMAP_FIELD.VALUE,
        key: 'fill',
      },
    ]);

    // Add heat legend
    const heatLegend = chart.bottomAxesContainer.children.push(
      am5.HeatLegend.new(root, {
        orientation: 'horizontal',
        endColor: am5.color(HEATMAP_COLOR.MIN),
        startColor: am5.color(HEATMAP_COLOR.MAX),
      }),
    );

    // Set data
    series.data.setAll(data);

    // Listen Event
    series.columns.template.events.on('pointerover', (event) => {
      const di = event?.target?.dataItem as any;
      if (di) {
        heatLegend.showValue(di?.get('value', 0));
      }
    });

    series.events.on('datavalidated', () => {
      heatLegend.set('startValue', series.getPrivate('valueHigh'));
      heatLegend.set('endValue', series.getPrivate('valueLow'));
    });

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <section className='container mt-30'>
      <div className='flex items-center'>
        <h5 className='h5 mb-0 mr-2'>{t('common.average_watched')}</h5>
        <Tooltip title={t('common.average_watched_tooltip')}>
          <IconQuestion className='cursor-pointer' />
        </Tooltip>
      </div>
      <div id='heatmap_div' className='w-full h-150'></div>
    </section>
  );
};

export default Heatmap;
