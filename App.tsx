import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AUTH_ROUTES } from './utils';

// Importar pantallas
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AdminDashboard from './screens/AdminDashboard';
import AdminPanel from './screens/AdminPanel';

import { SafeAreaView } from 'react-native-safe-area-context';


// Definir tipos de navegación
export type RootStackParamList = {
  [AUTH_ROUTES.LOGIN]: undefined;
  [AUTH_ROUTES.REGISTER]: undefined;
  [AUTH_ROUTES.ADMINDASHBOARD]: undefined;
  [AUTH_ROUTES.ADMINPANEL]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator id={undefined} initialRouteName={AUTH_ROUTES.LOGIN}  screenOptions={{ headerShown: false }}      >
        <Stack.Screen name={AUTH_ROUTES.LOGIN} component={LoginScreen} />
        <Stack.Screen name={AUTH_ROUTES.REGISTER} component={RegisterScreen} />
        <Stack.Screen name={AUTH_ROUTES.ADMINDASHBOARD} component={AdminDashboard} />
        <Stack.Screen name={AUTH_ROUTES.ADMINPANEL} component={AdminPanel} />
      </Stack.Navigator>
    </NavigationContainer>
    //<AdminPanel />
  );
};

export default App;