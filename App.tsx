import React,{useEffect} from 'react';
import 'react-native-gesture-handler';
import MainRoute from './src/Navigation/Route';
import { Provider as StoreProvider } from 'react-redux';
import { LogBox } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from './src/Redux/Store'

EntypoIcon.loadFont();
LogBox.ignoreLogs(['VirtualizedLists should never be nested', 'Warning: ...', 'Warning:', 'VirtualizedList:', "Accessing the 'state'", 'Found screens with the same name nested inside one another. Check:', 'Deprecation warning: value provided is no']); // Ignore log notification by message

const App = () => {
  useEffect(() => {SplashScreen.hide();}, [])
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor}>
          <MainRoute />

          <FlashMessage position="bottom" duration={2000} />
      </PersistGate>
    </StoreProvider>
  )

};


export default App;
