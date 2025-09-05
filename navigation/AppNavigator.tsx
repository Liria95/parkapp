import React, { useState } from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import UserTabNavigator from './UserTabNavigator';
import AdminTabNavigator from './AdminTabNavigator';

// Tipos para navegación del stack principal
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  UserTabs: undefined;
  AdminTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Props de LoginScreen
type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'> & {
  onLogin: (type: 'user' | 'admin') => void;
};

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'user' | 'admin'>('user');

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Login">
            {props => (
              <LoginScreen
                {...(props as LoginScreenProps)}
                onLogin={(type) => {
                  setUserType(type);
                  setIsLoggedIn(true);
                }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : userType === 'admin' ? (
        <Stack.Screen name="AdminTabs" component={AdminTabNavigator} />
      ) : (
        <Stack.Screen name="UserTabs" component={UserTabNavigator} />
      )}
    </Stack.Navigator>
  );
}
