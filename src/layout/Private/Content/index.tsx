import { type ReactNode, useEffect, useRef } from 'react';

import { Layout } from 'antd';

const { Content } = Layout;

const LayoutContent = ({ children }: { children: ReactNode }) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current.scrollTo(0, 0);
  }, [children]);

  return (
    <Content className='app-content' ref={ref}>
      {children}
    </Content>
  );
};

export default LayoutContent;
