import React from "react";
import { Provider } from 'react-redux';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from './store/store';
import App from './components/app/index'

const container = document.getElementById("root");
const root = createRoot(container);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
root.render(app);