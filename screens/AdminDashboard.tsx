import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

// Dimensiones de la pantalla
const { width, height } = Dimensions.get('window');
const scale = width / 375;

// Colores del sistema de diseño
const colors = {
  primary: '#2E7BDC',
  green: '#72C8A8',
  yellow: '#FFC857',
  red: '#E74C3C',
  dark: '#2C3E50',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6C757D',
  secondary: '#6C757D',
};

// Styled Components
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.lightGray};
`;

const Header = styled.View`
  background-color: ${colors.primary};
  padding: ${height * 0.06}px 5%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderContent = styled.View`
  flex: 1;
`;

const HeaderTitle = styled.Text`
  color: ${colors.white};
  font-size: ${18 * scale}px;
  font-weight: bold;
`;

const HeaderSubtitle = styled.Text`
  color: ${colors.white};
  font-size: ${14 * scale}px;
  opacity: 0.9;
  margin-top: ${2 * scale}px;
`;

const MenuButton = styled.TouchableOpacity`
  width: ${40 * scale}px;
  height: ${40 * scale}px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: ${20 * scale}px;
  justify-content: center;
  align-items: center;
`;

const StatsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5%;
  gap: ${12 * scale}px;
`;

const StatCard = styled.View<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  border-radius: ${12 * scale}px;
  padding: ${16 * scale}px;
  width: ${(width - width * 0.1 - 12 * scale) / 2}px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
  align-items: center;
`;

const StatNumber = styled.Text`
  font-size: ${24 * scale}px;
  font-weight: bold;
  color: ${colors.white};
  text-align: center;
`;

const StatLabel = styled.Text`
  font-size: ${12 * scale}px;
  color: ${colors.white};
  text-align: center;
  margin-top: ${4 * scale}px;
`;

const SectionCard = styled.View`
  background-color: ${colors.white};
  margin: 0 5% 15px 5%;
  border-radius: ${12 * scale}px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
`;

const SectionHeader = styled.View`
  padding: ${16 * scale}px ${20 * scale}px ${12 * scale}px ${20 * scale}px;
  border-bottom-width: 1px;
  border-bottom-color: #F0F0F0;
`;

const SectionTitle = styled.Text`
  font-size: ${16 * scale}px;
  font-weight: bold;
  color: ${colors.dark};
`;

const BottomNavigation = styled.View`
  flex-direction: row;
  background-color: ${colors.white};
  padding: ${12 * scale}px 0;
  border-top-width: 1px;
  border-top-color: #E5E5E5;
  elevation: 8;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const NavItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: ${8 * scale}px;
`;

interface NavigationProp {
  navigate: (screen: string) => void;
}

interface AdminDashboardProps {
  navigation: NavigationProp;
}

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

const AdminDashboard: React.FC<AdminDashboardProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'espacios' | 'usuarios'>('dashboard');

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

  const handleNavigation = (section: 'dashboard' | 'espacios' | 'usuarios') => {
    setActiveTab(section);
    Alert.alert('Navegación', `Ir a sección: ${section}`);
  };

  const renderUserItem = ({ item }: { item: ActiveUser }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14 * scale, fontWeight: 'bold', color: colors.dark, marginBottom: 4 }}>
          {item.plate} | ${item.balance.toFixed(2)}
        </Text>
        <Text style={{ fontSize: 12 * scale, color: colors.primary, marginBottom: 4 }}>
          {item.status === 'active' && item.currentLocation ? `ACTUALMENTE: ${item.currentLocation}` : 'SIN ACTIVIDAD'}
        </Text>
        <Text style={{ fontSize: 12 * scale, color: colors.gray }}>{item.name}</Text>
      </View>
      <NavItem
        style={{ backgroundColor: colors.primary, paddingHorizontal: 16 * scale, paddingVertical: 6 * scale, borderRadius: 4 * scale }}
        onPress={() => handleUserAction(item.id)}
      >
        <Text style={{ color: colors.white, fontSize: 12 * scale, fontWeight: 'bold' }}>VER</Text>
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
          <Ionicons name="menu" size={20 * scale} color={colors.white} />
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
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 30 * scale }}>
            <Ionicons name="bar-chart-outline" size={50 * scale} color={colors.secondary} />
            <Text style={{ fontSize: 14 * scale, color: colors.gray, marginTop: 8, textAlign: 'center' }}>Actividad en Tiempo Real</Text>
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
        <NavItem onPress={() => handleNavigation('dashboard')}>
          <Ionicons name="grid-outline" size={22 * scale} color={activeTab === 'dashboard' ? colors.primary : colors.gray} />
          <Text style={{ fontSize: 10 * scale, fontWeight: '500', marginTop: 4, textAlign: 'center', color: activeTab === 'dashboard' ? colors.primary : colors.gray }}>DASHBOARD</Text>
        </NavItem>
        <NavItem onPress={() => handleNavigation('espacios')}>
          <Ionicons name="car-outline" size={22 * scale} color={activeTab === 'espacios' ? colors.primary : colors.gray} />
          <Text style={{ fontSize: 10 * scale, fontWeight: '500', marginTop: 4, textAlign: 'center', color: activeTab === 'espacios' ? colors.primary : colors.gray }}>ESPACIOS</Text>
        </NavItem>
        <NavItem onPress={() => handleNavigation('usuarios')}>
          <Ionicons name="people-outline" size={22 * scale} color={activeTab === 'usuarios' ? colors.primary : colors.gray} />
          <Text style={{ fontSize: 10 * scale, fontWeight: '500', marginTop: 4, textAlign: 'center', color: activeTab === 'usuarios' ? colors.primary : colors.gray }}>USUARIOS</Text>
        </NavItem>
      </BottomNavigation>
    </Container>
  );
};

export default AdminDashboard;