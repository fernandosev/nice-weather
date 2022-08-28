import React from 'react';

// Libs
import {MenuProvider} from 'react-native-popup-menu';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
// import Clipboard from '@react-native-clipboard/clipboard';

// Store
import {store, persistor} from '~/store';

// Dulkee App
import App from './App';

const Index: React.FC = () => {
  return (
    <MenuProvider skipInstanceCheck={true}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </MenuProvider>
  );
};

export default Index;
