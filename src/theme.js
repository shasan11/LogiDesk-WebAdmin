import { theme } from 'antd';

export const antdTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#2563eb',
    colorInfo: '#2563eb',
    colorSuccess: '#16a34a',
    colorWarning: '#d97706',
    colorError: '#dc2626',
    borderRadius: 8,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    colorBgLayout: '#f5f7fb',
  },
  components: {
    Layout: {
      bodyBg: '#f5f7fb',
      headerBg: '#ffffff',
      siderBg: '#ffffff',
    },
    Card: {
      borderRadiusLG: 12,
    },
    Input: {
      controlHeight: 40,
    },
    Button: {
      controlHeight: 40,
      fontWeight: 600,
      primaryShadow: 'none',
    },
    Form: {
      itemMarginBottom: 18,
      labelColor: '#111827',
    },
  },
};
