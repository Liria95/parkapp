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

// NUEVO: Importar navegación de usuario
import NavegadorTabsUsuario from './screens/user/navegacion/NavegadorTabs';

// Context
import { AuthProvider, AuthContext } from './components/shared/Context/AuthContext';
import { UsuarioProvider } from './screens/user/contexto/UsuarioContext';
import { colors } from './constants/colors';

// Tipos de navegación
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AdminStackParamList = {
  AdminDashboard: undefined;
  AdminDrawer: undefined;
};

export type UserStackParamList = {
  UserMain: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AdminStack = createNativeStackNavigator<AdminStackParamList>();
const UserStack = createNativeStackNavigator<UserStackParamList>();

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

// Stack de autenticación
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
      options={{ gestureEnabled: false }}
    />
    <AuthStack.Screen 
      name="Register" 
      component={RegisterScreen}
    />
  </AuthStack.Navigator>
);

// Stack para Admin
const AdminNavigator = () => (
  <AdminStack.Navigator screenOptions={{ headerShown: false }}>
    <AdminStack.Screen name="AdminDashboard" component={AdminDashboard} />
    <AdminStack.Screen name="AdminDrawer" component={AdminDrawer} />
  </AdminStack.Navigator>
);

// Stack para Usuario Final
const UserNavigator = () => (
  <UsuarioProvider>
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="UserMain" component={NavegadorTabsUsuario} />
    </UserStack.Navigator>
  </UsuarioProvider>
);

// Componente que decide qué navegación mostrar
const RootNavigator = () => {
  const { state } = useContext(AuthContext);

  console.log('Estado actual:', {
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    userType: state.user?.type,
    user: state.user?.name || 'No user'
  });

  if (state.isLoading) {
    return <LoadingScreen />;
  }

  if (!state.isAuthenticated) {
    return <AuthNavigator />;
  }

  // Decide navegación según tipo de usuario
  if (state.user?.type === 'admin') {
    return <AdminNavigator />;
  } else {
    return <UserNavigator />;
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