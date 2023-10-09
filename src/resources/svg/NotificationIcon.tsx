import type { FC, SVGProps } from 'react';

const NotificationIcon: FC<SVGProps<SVGSVGElement>> = () => (
  <svg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12 3.375C10.8954 3.375 10 4.27043 10 5.375V5.71641C7.66962 6.54008 6 8.76256 6 11.375V16.375H5C4.44772 16.375 4 16.8227 4 17.375C4 17.9273 4.44772 18.375 5 18.375H19C19.5523 18.375 20 17.9273 20 17.375C20 16.8227 19.5523 16.375 19 16.375H18V11.375C18 8.76256 16.3304 6.54008 14 5.71641V5.375C14 4.27043 13.1046 3.375 12 3.375Z'
      fill='#393939'
    />
    <path d='M12 21.375C10.8954 21.375 10 20.4796 10 19.375H14C14 20.4796 13.1046 21.375 12 21.375Z' fill='#393939' />
  </svg>
);

export default NotificationIcon;
