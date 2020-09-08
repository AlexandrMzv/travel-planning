/**
 * Точка входа в приложение (frontend)
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import App from './App';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ruRU } from '@material-ui/core/locale';

const store = configureStore();

//Конфигурация темы Material-UI
const theme = createMuiTheme({
  palette: {
    primary: { main: '#563d7c' },
    secondary: { main: '#5b8938' },
  },
}, ruRU);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Route component={App}/>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
