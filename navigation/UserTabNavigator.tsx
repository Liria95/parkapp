import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { COLORS } from '../utils/colors';

import MapScreen from '../screens/user/MapScreen';
import SaldoScreen from '../screens/user/SaldoScreen';
import HistoryScreen from '../screens/user/HistoryScreen';
import ProfileScreen from '../screens/user/ProfileScreen';

// Tipos para las rutas del tab
export type UserTabParamList = {
  Map: undefined;
  Saldo: undefined;
  History: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<UserTabParamList>();

export default function UserTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;
          switch (route.name) {
            case 'Map':
              iconName = '🗺️';
              break;
            case 'Saldo':
              iconName = '💰';
              break;
            case 'History':
              iconName = '📋';
              break;
            case 'Profile':
              iconName = '👤';
              break;
            default:
              iconName = '❓';
          }
          return <Text style={{ fontSize: 20 }}>{iconName}</Text>;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Mapa' }} />
      <Tab.Screen name="Saldo" component={SaldoScreen} options={{ title: 'Saldo' }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'Historial' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}
