import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SearchAddressScreen from './screens/SearchAddressScreen';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import userReducer from './store/user.reducer';
import RouteMapScreen from './screens/RouteMapScreen';

const Stack = createStackNavigator();

// const mainReducer = combineReducers({
//   user: userReducer
// })

//const store = createStore(mainReducer, applyMiddleware(thunk))

export default function App() {
  return (
    // <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SearchAddress"
            component={SearchAddressScreen} />
          <Stack.Screen
            // options={{ headerShown: false }}
            name="RouteMap"
            component={RouteMapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    // </Provider>
  );
}
