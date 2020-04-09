import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { Drinks } from './components/views/Drinks/Drinks';
import { Shop } from './components/views/Shop/Shop';
import { Contact } from './components/views/Contact/Contact';
import { NotFound } from './components/views/NotFound/NotFound';
import { DrinkId } from './components/views/DrinkId/DrinkId';
import { ProductId } from './components/views/ProductId/ProductId';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2B4C6F' },
  },
});

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/drinks' component={Drinks} />
              <Route exact path='/shop' component={Shop} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/drink/:id' component={DrinkId} />
              <Route exact path='/product/:id' component={ProductId} />
              <Route path='*' component={NotFound} />
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </Provider>
);

export { App };
