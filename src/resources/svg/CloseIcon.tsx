import type { FC, SVGProps } from 'react';

const CloseIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M16.9428 16.0003L20.4714 12.4717C20.7321 12.211 20.7321 11.7897 20.4714 11.529C20.2108 11.2683 19.7894 11.2683 19.5288 11.529L16.0001 15.0577L12.4714 11.529C12.2108 11.2683 11.7894 11.2683 11.5288 11.529C11.2681 11.7897 11.2681 12.211 11.5288 12.4717L15.0574 16.0003L11.5288 19.529C11.2681 19.7897 11.2681 20.211 11.5288 20.4717C11.6588 20.6017 11.8294 20.667 12.0001 20.667C12.1708 20.667 12.3414 20.6017 12.4714 20.4717L16.0001 16.943L19.5288 20.4717C19.6588 20.6017 19.8294 20.667 20.0001 20.667C20.1708 20.667 20.3414 20.6017 20.4714 20.4717C20.7321 20.211 20.7321 19.7897 20.4714 19.529L16.9428 16.0003Z'
      fill='#393939'
    />
    <rect x='0.5' y='0.5' width='31' height='31' rx='15.5' stroke='#D9DBDC' />
  </svg>
);

export default CloseIcon;
