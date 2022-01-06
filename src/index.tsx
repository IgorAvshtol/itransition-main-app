import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './i18n/config';
import './firebase/config';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <App/>
        </Provider>
      </Suspense>
    </BrowserRouter>,
    document.getElementById('root')
);


