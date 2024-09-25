import React from 'react';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import { initMiniApp, mockTelegramEnv } from '@telegram-apps/sdk';

const initializeTelegramSDK = async () => {
  try {
    console.log("Инициализация окружения Telegram");
    const [miniApp] = initMiniApp();
    await miniApp.ready();
  } catch (error) {
    console.error('Ошибка при инициализации Telegram:', error);
    mockTelegramEnv({
      themeParams: {
        headerBgColor: 'grey',
      }
    });
    console.log('Mock Telegram environment initialized');
  }
};
initializeTelegramSDK();

const router = createBrowserRouter([
  {
    path: "/",
    element: < App />,
  },
  {
    path: "*",
    element: < App />,
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
