import { Suspense } from 'react';
import { withTranslation } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';

import { Spin } from 'antd';
import { router } from 'routes';

function App() {
  return (
    <Suspense
      fallback={
        <div className='page-loading'>
          <Spin size='large' tip='Loading...' />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default withTranslation()(App);
