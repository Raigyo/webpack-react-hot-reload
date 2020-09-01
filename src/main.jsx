
import { AppContainer } from 'react-hot-loader'
import React from 'react';
import ReactDOM from 'react-dom'
import App from './components/App'

const renderApp = Component => {
  ReactDOM.render(
    <AppContainer>
      <App/>
    </AppContainer>,
    document.getElementById('app')
  );
}

renderApp(App);

if (module.hot) {
  module.hot.accept('./components/App', () => { renderApp(App) });
}

