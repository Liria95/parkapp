import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

// Importar las pantallas
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AdminDashboard from './screens/AdminDashboard';

// Tipos para las pantallas
type ScreenName = 'Login' | 'Register' | 'AdminDashboard';

interface NavigationProp {
  navigate: (screenName: ScreenName) => void;
}

const App: React.FC = () => {
  // Estado para manejar qué pantalla mostrar
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Login');

  // Simulamos navigation
  const mockNavigation: NavigationProp = {
    navigate: (screenName: ScreenName): void => {
      setCurrentScreen(screenName);
    }
  };

  // Función para renderizar la pantalla actual
  const renderScreen = () => {
    console.log('Renderizando pantalla:', currentScreen);
    switch (currentScreen) {
      case 'Login':
        return <LoginScreen navigation={mockNavigation} />;
      case 'Register':
        return <RegisterScreen navigation={mockNavigation} />;
      case 'AdminDashboard':
        return <AdminDashboard navigation={mockNavigation} />;
      default:
        console.log('Pantalla no encontrada, mostrando Login');
        return <LoginScreen navigation={mockNavigation} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;