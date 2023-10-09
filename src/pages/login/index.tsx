import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Col, Row } from 'antd';

import LoginForm from 'modules/Authentication/components/Login';

const Login: FC = () => {
  const { t } = useTranslation();

  return (
    <main>
      <Row gutter={[80, 80]} justify='space-around' align='middle' className='h-100% '>
        <Col span={12}>
          <div className='flex flex-col justify-center ml-90'>
            <h4 className='h4 color-primary font-bold mb-16 text-4xl'>{t('common.8_beat')}</h4>
            <div className='separate h-1 w-50 bg-primary mb-16'></div>
            <h5 className='h5 font-bold text-3xl'>{t('common.admin')}</h5>
          </div>
        </Col>
        <Col span={12}>
          <div className='shadow-xl rounded-[16px] p-24 max-w-[75%] mx-auto'>
            <LoginForm />
          </div>
        </Col>
        <div className='page-overlay'></div>
      </Row>
    </main>
  );
};

export default Login;
