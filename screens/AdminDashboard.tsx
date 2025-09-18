import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {colors } from '../utils';
import { DIMENSIONES, AUTH_ROUTES } from '../utils';

// Tipado navegación
type RootStackParamList = {
[AUTH_ROUTES.ADMINDASHBOARD]: undefined;
};

type AdminDashboardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof AUTH_ROUTES.ADMINDASHBOARD
>;

// Styled Components (igual que antes)
const Container = styled.SafeAreaView`flex: 1; background-color: ${colors.lightGray};`;
const Header = styled.View`background-color: ${colors.primary}; padding: ${ DIMENSIONES.HEIGHT * 0.06}px 5%; flex-direction: row; justify-content: space-between; align-items: center;`;
const HeaderContent = styled.View`flex: 1;`;
const HeaderTitle = styled.Text`color: ${colors.white}; font-size: ${18 * DIMENSIONES.SCALE}px; font-weight: bold;`;
const HeaderSubtitle = styled.Text`color: ${colors.white}; font-size: ${14 * DIMENSIONES.SCALE}px; opacity: 0.9; margin-top: ${2 * DIMENSIONES.SCALE}px;`;
const MenuButton = styled.TouchableOpacity`width: ${40 * DIMENSIONES.SCALE}px; height: ${40 * DIMENSIONES.SCALE}px; background-color: rgba(255, 255, 255, 0.2); border-radius: ${20 * DIMENSIONES.SCALE}px; justify-content: center; align-items: center;`;
const StatsGrid = styled.View`flex-direction: row; flex-wrap: wrap; padding: 5%; gap: ${12 * DIMENSIONES.SCALE}px;`;
const StatCard = styled.View<{ bgColor: string }>`background-color: ${(props) => props.bgColor}; border-radius: ${12 * DIMENSIONES.SCALE}px; padding: ${16 * DIMENSIONES.SCALE}px; width: ${(DIMENSIONES.WIDTH - DIMENSIONES.WIDTH * 0.1 - 12 * DIMENSIONES.SCALE) / 2}px; elevation: 2; shadow-color: #000; shadow-offset: 0px 2px; shadow-opacity: 0.08; shadow-radius: 4px; align-items: center;`;
const StatNumber = styled.Text`font-size: ${24 * DIMENSIONES.SCALE}px; font-weight: bold; color: ${colors.white}; text-align: center;`;
const StatLabel = styled.Text`font-size: ${12 * DIMENSIONES.SCALE}px; color: ${colors.white}; text-align: center; margin-top: ${4 * DIMENSIONES.SCALE}px;`;
const SectionCard = styled.View`background-color: ${colors.white}; margin: 0 5% 15px 5%; border-radius: ${12 * DIMENSIONES.SCALE}px; elevation: 2; shadow-color: #000; shadow-offset: 0px 2px; shadow-opacity: 0.08; shadow-radius: 4px;`;
const SectionHeader = styled.View`padding: ${16 * DIMENSIONES.SCALE}px ${20 * DIMENSIONES.SCALE}px ${12 * DIMENSIONES.SCALE}px ${20 * DIMENSIONES.SCALE}px; border-bottom-width: 1px; border-bottom-color: #F0F0F0;`;
const SectionTitle = styled.Text`font-size: ${16 * DIMENSIONES.SCALE}px; font-weight: bold; color: ${colors.dark};`;
const BottomNavigation = styled.View`flex-direction: row; background-color: ${colors.white}; padding: ${12 * DIMENSIONES.SCALE}px 0; border-top-width: 1px; border-top-color: #E5E5E5; elevation: 8; shadow-color: #000; shadow-offset: 0px -2px; shadow-opacity: 0.1; shadow-radius: 4px;`;
const NavItem = styled.TouchableOpacity`flex: 1; align-items: center; justify-content: center; padding-vertical: ${8 * DIMENSIONES.SCALE}px;`;

// Tipos de datos
interface ActiveUser {
  id: string;
  name: string;
  plate: string;
  balance: number;
  currentLocation?: string;
  status: 'active' | 'inactive';
}

interface DashboardStats {
  occupiedSpaces: number;
  freeSpaces: number;
  todayIncome: number;
  violations: number;
}

const AdminDashboard: React.FC = () => {
  const navigation = useNavigation<AdminDashboardNavigationProp>();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'espacios' | 'usuarios'| 'adminpanel'>('dashboard');

  const [stats] = useState<DashboardStats>({
    occupiedSpaces: 156,
    freeSpaces: 44,
    todayIncome: 24580,
    violations: 12,
  });

  const [activeUsers] = useState<ActiveUser[]>([
    { id: '1', name: 'JUAN PÉREZ', plate: 'ABC123', balance: 1250.0, currentLocation: 'AV. SAN MARTÍN', status: 'active' },
    { id: '2', name: 'MARÍA GARCÍA', plate: 'XYZ789', balance: 850.0, status: 'inactive' },
  ]);

  const handleUserAction = (userId: string) => {
    Alert.alert('Ver Usuario', `Mostrar detalles del usuario ${userId}`);
  };

  const handleMenuPress = () => {
    Alert.alert('Menú', 'Gestión de Estacionamientos\nTransacciones y Saldo\nInfracciones');
  };

  const handleNavigation = (section: 'dashboard' | 'espacios' | 'usuarios' | 'adminpanel') => {
    setActiveTab(section);
    //Alert.alert('Navegación', `Ir a sección: ${section}`);
    switch (section) {
      case 'dashboard':
        navigation.navigate(AUTH_ROUTES.ADMINDASHBOARD);
        break;
      case 'adminpanel':
        navigation.navigate(AUTH_ROUTES.ADMINPANEL);
        break;
      default:
        Alert.alert('Navegación', `Sección no encontrada: ${section}`);
  }

  };

  const renderUserItem = ({ item }: { item: ActiveUser }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14 * DIMENSIONES.SCALE, fontWeight: 'bold', color: colors.dark, marginBottom: 4 }}>
          {item.plate} | ${item.balance.toFixed(2)}
        </Text>
        <Text style={{ fontSize: 12 * DIMENSIONES.SCALE, color: colors.primary, marginBottom: 4 }}>
          {item.status === 'active' && item.currentLocation ? `ACTUALMENTE: ${item.currentLocation}` : 'SIN ACTIVIDAD'}
        </Text>
        <Text style={{ fontSize: 12 * DIMENSIONES.SCALE, color: colors.gray }}>{item.name}</Text>
      </View>
      <NavItem style={{ backgroundColor: colors.primary, paddingHorizontal: 16 * DIMENSIONES.SCALE, paddingVertical: 6 * DIMENSIONES.SCALE, borderRadius: 4 * DIMENSIONES.SCALE }} onPress={() => handleUserAction(item.id)}>
        <Text style={{ color: colors.white, fontSize: 12 * DIMENSIONES.SCALE, fontWeight: 'bold' }}>VER</Text>
      </NavItem>
    </View>
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <HeaderTitle>Admin - Sistema ParkApp</HeaderTitle>
          <HeaderSubtitle>Dashboard General</HeaderSubtitle>
        </HeaderContent>
        <MenuButton onPress={handleMenuPress}>
          <Ionicons name="menu" size={20 * DIMENSIONES.SCALE} color={colors.white} />
        </MenuButton>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <StatsGrid>
          <StatCard bgColor={colors.primary}>
            <StatNumber>{stats.occupiedSpaces}</StatNumber>
            <StatLabel>Espacios{'\n'}Ocupados</StatLabel>
          </StatCard>

          <StatCard bgColor={colors.green}>
            <StatNumber>{stats.freeSpaces}</StatNumber>
            <StatLabel>Espacios{'\n'}Libres</StatLabel>
          </StatCard>

          <StatCard bgColor={colors.yellow}>
            <StatNumber>${stats.todayIncome.toLocaleString()}</StatNumber>
            <StatLabel>Ingresos Hoy</StatLabel>
          </StatCard>

          <StatCard bgColor={colors.red}>
            <StatNumber>{stats.violations}</StatNumber>
            <StatLabel>Infracciones</StatLabel>
          </StatCard>
        </StatsGrid>

        <SectionCard>
          <SectionHeader>
            <SectionTitle>Gráfico de ocupación</SectionTitle>
          </SectionHeader>
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 30 * DIMENSIONES.SCALE }}>
            <Ionicons name="bar-chart-outline" size={50 * DIMENSIONES.SCALE} color={colors.secondary} />
            <Text style={{ fontSize: 14 * DIMENSIONES.SCALE, color: colors.gray, marginTop: 8, textAlign: 'center' }}>Actividad en Tiempo Real</Text>
          </View>
        </SectionCard>

        <SectionCard>
          <SectionHeader>
            <SectionTitle>Usuarios Activos</SectionTitle>
          </SectionHeader>
          <FlatList data={activeUsers} renderItem={renderUserItem} keyExtractor={(item) => item.id} scrollEnabled={false} />
        </SectionCard>
      </ScrollView>

      <BottomNavigation>
        <NavItem onPress={() => handleNavigation('adminpanel')}>
          <Ionicons name="briefcase-outline" size={22 * DIMENSIONES.SCALE} color={activeTab === 'adminpanel' ? colors.primary : colors.gray} />
          <Text style={{ fontSize: 10 * DIMENSIONES.SCALE, fontWeight: '500', marginTop: 4, textAlign: 'center', color: activeTab === 'adminpanel' ? colors.primary : colors.gray }}>ADMIN</Text>
        </NavItem>
        <NavItem onPress={() => handleNavigation('dashboard')}>
          <Ionicons name="grid-outline" size={22 * DIMENSIONES.SCALE} color={activeTab === 'dashboard' ? colors.primary : colors.gray} />
          <Text style={{ fontSize: 10 * DIMENSIONES.SCALE, fontWeight: '500', marginTop: 4, textAlign: 'center', color: activeTab === 'dashboard' ? colors.primary : colors.gray }}>DASHBOARD</Text>
        </NavItem>
        <NavItem onPress={() => handleNavigation('espacios')}>
          <Ionicons name="car-outline" size={22 * DIMENSIONES.SCALE} color={activeTab === 'espacios' ? colors.primary : colors.gray} />
          <Text style={{ fontSize: 10 * DIMENSIONES.SCALE, fontWeight: '500', marginTop: 4, textAlign: 'center', color: activeTab === 'espacios' ? colors.primary : colors.gray }}>ESPACIOS</Text>
        </NavItem>
        <NavItem onPress={() => handleNavigation('usuarios')}>
          <Ionicons name="people-outline" size={22 * DIMENSIONES.SCALE} color={activeTab === 'usuarios' ? colors.primary : colors.gray} />
          <Text style={{ fontSize: 10 * DIMENSIONES.SCALE, fontWeight: '500', marginTop: 4, textAlign: 'center', color: activeTab === 'usuarios' ? colors.primary : colors.gray }}>USUARIOS</Text>
        </NavItem>
      </BottomNavigation>
    </Container>
  );
};

export default AdminDashboard;