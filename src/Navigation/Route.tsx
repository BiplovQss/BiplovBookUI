import * as React from 'react';
import { Dimensions} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import Register from '../Screens/Register';


const { height, width } = Dimensions.get('window');
const Stack = createNativeStackNavigator();


const MainRoute = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false, gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainRoute;
