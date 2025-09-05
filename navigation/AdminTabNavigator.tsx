import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../utils/colors';

// Screens
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import UserManagementScreen from '../screens/admin/UserManagementScreen';
import InfractionManagementScreen from '../screens/admin/InfractionManagementScreen';
import AdminPanelScreen from '../screens/admin/AdminPanelScreen';
import ManualRegistrationScreen from '../screens/admin/ManualRegistrationScreen';

// Tipos para Stacks
type DashboardStackParamList = {
  DashboardMain: undefined;
  ManualRegistration: undefined;
};

type UsersStackParamList = {
  UserManagementMain: undefined;
};

type InfractionsStackParamList = {
  InfractionManagementMain: undefined;
};

type AdminPanelStackParamList = {
  AdminPanelMain: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<any>(); // <any> para simplificar, o usar union de todos los stacks

// Tab icon component
type TabIconProps = {
  focused: boolean;
  icon: string;
  badge?: string | null;
};

const TabIcon: React.FC<TabIconProps> = ({ focused, icon, badge }) => (
  <View style={{ alignItems: 'center', position: 'relative' }}>
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>{icon}</Text>
    {badge && (
      <View
        style={{
          position: 'absolute',
          top: -5,
          right: -10,
          backgroundColor: COLORS.danger,
          borderRadius: 8,
          paddingHorizontal: 5,
          paddingVertical: 2,
          minWidth: 16,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: COLORS.white, fontSize: 10, fontWeight: 'bold' }}>{badge}</Text>
      </View>
    )}
  </View>
);

// Stacks
function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardMain" component={AdminDashboardScreen} />
      <Stack.Screen name="ManualRegistration" component={ManualRegistrationScreen} />
    </Stack.Navigator>
  );
}

function UsersStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserManagementMain" component={UserManagementScreen} />
    </Stack.Navigator>
  );
}

function InfractionsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InfractionManagementMain" component={InfractionManagementScreen} />
    </Stack.Navigator>
  );
}

function AdminPanelStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminPanelMain" component={AdminPanelScreen} />
    </Stack.Navigator>
  );
}

export default function AdminTabNavigator() {
  const infractionsPendingCount = 3;

  const screenOptions = ({ route }: { route: any }): BottomTabNavigationOptions => ({
    tabBarIcon: ({ focused }) => {
      let iconName: string;
      let badge: string | null = null;

      if (route.name === 'Dashboard') iconName = '📊';
      else if (route.name === 'Users') iconName = '👥';
      else if (route.name === 'Infractions') {
        iconName = '🚨';
        badge = infractionsPendingCount.toString();
      } else if (route.name === 'Panel') iconName = '⚙️';
      else iconName = '❓';

      return <TabIcon focused={focused} icon={iconName} badge={badge} />;
    },
    tabBarActiveTintColor: COLORS.danger,
    tabBarInactiveTintColor: COLORS.gray,
    headerShown: false,
    tabBarStyle: {
      backgroundColor: COLORS.white,
      borderTopColor: COLORS.danger + '20',
      borderTopWidth: 1,
      paddingVertical: 5,
      height: 70,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    tabBarLabelStyle: {
      fontSize: 11,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    tabBarItemStyle: {
      paddingVertical: 5,
    },
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Users" component={UsersStack} />
      <Tab.Screen name="Infractions" component={InfractionsStack} />
      <Tab.Screen name="Panel" component={AdminPanelStack} />
    </Tab.Navigator>
  );
}
