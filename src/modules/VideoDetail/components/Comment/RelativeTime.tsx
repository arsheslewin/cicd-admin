import React from 'react';

interface IProps {
  time: any;
}

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;
const MS_PER_MONTH = 30 * MS_PER_DAY;
const MS_PER_YEAR = 12 * MS_PER_MONTH;

const RelativeTime: React.FC<IProps> = ({ time }) => {
  const currentTime = new Date().getTime();
  const _time = new Date(time).getTime();
  const relativeTime = currentTime - _time;

  const renderTimeFromNow = (relativeTime: any) => {
    if (relativeTime < MS_PER_SECOND) {
      return '1s ago';
    }
    if (relativeTime < MS_PER_MINUTE) {
      return `${Math.round(relativeTime / MS_PER_SECOND)}s ago`;
    }

    if (relativeTime < MS_PER_HOUR) {
      return `${Math.round(relativeTime / MS_PER_MINUTE)}min ago`;
    }

    if (relativeTime < MS_PER_DAY) {
      return `${Math.round(relativeTime / MS_PER_HOUR)}h ago`;
    }

    if (relativeTime < MS_PER_MONTH) {
      return `${Math.round(relativeTime / MS_PER_DAY)}d ago`;
    }

    if (relativeTime < MS_PER_YEAR) {
      return `${Math.round(relativeTime / MS_PER_MONTH)}mo ago`;
    }

    return `${Math.round(relativeTime / MS_PER_YEAR)}y ago`;
  };

  return <span>{renderTimeFromNow(relativeTime)}</span>;
};

export default RelativeTime;
