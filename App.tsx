import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AUTH_ROUTES } from './utils';

// Importar todas las pantallas
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AdminDashboard from './screens/AdminDashboard';
import EspaciosScreen from './screens/EspaciosScreen';
import GestionUsuariosScreen from './screens/GestionUsuariosScreen';
import InfraccionesScreen from './screens/InfraccionesScreen';
import RegistroManualScreen from './screens/RegistroManualScreen';
import AdminPanel from './screens/AdminPanel';

// Definir los tipos de navegación
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  AdminDashboard: undefined;
  Espacios: undefined;
  GestionUsuarios: undefined;
  Infracciones: undefined;
  RegistroManual: undefined;
  AdminPanel: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // Ocultar header por defecto ya que cada pantalla tiene su propio header
          gestureEnabled: true,
          animation: 'slide_from_right',
        }}
      >
        {/* Pantallas de autenticación */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            gestureEnabled: false, // Deshabilitar gesto de volver en login
          }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
        />

        {/* Pantallas de administración */}
        <Stack.Screen 
          name="AdminDashboard" 
          component={AdminDashboard}
          options={{
            gestureEnabled: false, // Deshabilitar gesto de volver en dashboard principal
          }}
        />
        <Stack.Screen 
          name="AdminPanel" 
          component={AdminPanel}
        />
        <Stack.Screen 
          name="Espacios" 
          component={EspaciosScreen}
        />
        <Stack.Screen 
          name="GestionUsuarios" 
          component={GestionUsuariosScreen}
        />
        <Stack.Screen 
          name="Infracciones" 
          component={InfraccionesScreen}
        />
        <Stack.Screen 
          name="RegistroManual" 
          component={RegistroManualScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
    //<AdminPanel />
  );
};

export default App;