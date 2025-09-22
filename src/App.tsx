import type {ThemeConfig} from 'antd';
import {ConfigProvider, App as AntApp} from 'antd';
import {RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {router} from '@/routes';
import {useMemo} from 'react';

const config: ThemeConfig = {
  token: {
    fontFamily: '"Google Sans Code", monospace',
    colorPrimary: '#1237c9',
    colorInfo: '#1237c9',
    borderRadius: 4,
  },
  components: {
    Layout: {
      bodyBg: 'rgb(255,255,255)',
      headerBg: 'rgb(255,255,255)',
    },
  },
};

const AppContent: React.FC = () => {
  const {message} = AntApp.useApp();
  const queryClient = useMemo(() => (
    new QueryClient({
      defaultOptions: {
        mutations: {
          onError: (error: Error) => {
            message.error(`操作失敗: ${error.message}`);
          },
        },
      },
    })
  ), [message]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};


const App: React.FC = () => {
  return (
    <ConfigProvider theme={config}>
      <AntApp>
        <AppContent />
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
