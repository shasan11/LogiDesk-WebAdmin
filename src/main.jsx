import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App as AntdApp, ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import App from './App';
import { store } from './app/store';
import { antdTheme } from './theme';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={antdTheme}>
        <AntdApp>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AntdApp>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);
