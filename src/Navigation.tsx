import React from 'react';
import Login from './Authentification/Login';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useAppSelector} from './hooks/store';
import Home from './Home';

const Stack = createNativeStackNavigator();

const LoggedIn = createBottomTabNavigator();

const LoggedInNavigation = () => {
  return (
    <LoggedIn.Navigator screenOptions={{headerShown: false}}>
      <LoggedIn.Screen name="Home" component={Home} />
    </LoggedIn.Navigator>
  );
};

const Navigation = () => {
  const {isAuthenticated, error} = useAppSelector((state: any) => state.auth);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <LoggedInNavigation />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
