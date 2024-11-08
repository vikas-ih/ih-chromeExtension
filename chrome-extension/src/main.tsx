import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ConfigProvider } from 'antd';

const antTheme = {
  token: {
    colorPrimary: "#00d090",
    inkBarColor: "#00d090",
    itemActiveColor: "#00d090",
    itemHoverColor: "#00d090",
    fontFamily: "'poppins', sans-serif",
  },
};

createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={antTheme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ConfigProvider>
);
