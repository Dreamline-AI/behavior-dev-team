/** 
 * define the stack navigator for authenticated users. It will include all screens that a logged-in user can access.
*/
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
// Import other authenticated screens as needed

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      {/* Add other authenticated screens here */}
    </Stack.Navigator>
  );
};

export default AppStack;
