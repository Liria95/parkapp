import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

// Importar pantallas
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import AdminDashboard from './screens/admin/AdminDashboard';
import AdminDrawer from './screens/admin/AdminDrawer';

// Context
import { AuthProvider, AuthContext } from './components/shared/Context/AuthContext';
import { colors } from './constants/colors';

// Tipos de navegación
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  AdminDashboard: undefined;
  AdminDrawer: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

// Componente de loading
const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lightGray};
`;

const LoadingScreen = () => (
  <LoadingContainer>
    <ActivityIndicator size="large" color={colors.primary} />
  </LoadingContainer>
);

// Stack de autenticación (cuando no está logueado)
const AuthNavigator = () => (
  <AuthStack.Navigator 
    initialRouteName="Login"
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      animation: 'slide_from_right',
    }}
  >
    <AuthStack.Screen 
      name="Login" 
      component={LoginScreen}
      options={{
        gestureEnabled: false,
      }}
    />
    <AuthStack.Screen 
      name="Register" 
      component={RegisterScreen}
    />
  </AuthStack.Navigator>
);

// Stack principal (cuando está logueado)
const AppNavigator = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AppStack.Screen 
      name="AdminDashboard" 
      component={AdminDashboard}
    />
    <AppStack.Screen 
      name="AdminDrawer" 
      component={AdminDrawer}
    />
  </AppStack.Navigator>
);

// Componente que decide qué navegación mostrar
const RootNavigator = () => {
  const { state } = useContext(AuthContext);

  // Logs de debug
  console.log('🔍 RootNavigator - Estado actual:', {
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    user: state.user?.name || 'No user',
    token: state.token ? 'Presente' : 'Ausente'
  });

  if (state.isLoading) {
    console.log('📱 Mostrando LoadingScreen');
    return <LoadingScreen />;
  }

  if (state.isAuthenticated) {
    console.log('Usuario autenticado - Mostrando AppNavigator');
    return <AppNavigator />;
  } else {
    console.log('Usuario NO autenticado - Mostrando AuthNavigator');
    return <AuthNavigator />;
  }
};

// App principal
const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;