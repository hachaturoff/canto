import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WagmiConfig } from 'wagmi';
import { chains, wagmiClient } from './services/rainbow/config';
import { AvatarComponent, darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Provider } from 'react-redux';
import { store } from './store';
import bear from './img/bear.png'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return (
    <img
      src={bear}
      width={size}
      height={size}
    />
  )
};

root.render(
  // <React.StrictMode>
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains} avatar={CustomAvatar} theme={darkTheme()}>
      <Provider store={store} >
        <App />
      </Provider>
    </RainbowKitProvider>
  </WagmiConfig>
  // </React.StrictMode>
);

reportWebVitals()
