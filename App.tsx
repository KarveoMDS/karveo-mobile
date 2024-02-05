import {StatusBar, View, Text} from 'react-native';
import {Provider} from 'react-redux';
import Login from './src/Authentification/Login';
import store from './src/store';
import React from 'react';
import Navigation from './src/Navigation';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <View className="flex-1 p-0">
        <Navigation />
      </View>
    </Provider>
  );
}

export default App;
