import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from "redux-thunk"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SearchAddressScreen from './screens/SearchAddressScreen';
import RouteMapScreen from './screens/RouteMapScreen';
import userReducer from './store/user/user.reducer';
import itineraryReducer from './store/itinerary/itinerary.reducer'

const Stack = createStackNavigator();

const mainReducer = combineReducers({
  user: userReducer,
  itinerary: itineraryReducer
})

const store = createStore(
  mainReducer,
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
