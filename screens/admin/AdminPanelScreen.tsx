import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

type DashboardData = {
  espaciosOcupados: number;
  espaciosLibres: number;
  ingresosHoy: number;
  infraccionesHoy: number;
  usuariosActivos: number;
  transaccionesHoy: number;
};

type MenuItemType = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  screen: string;
  color: [string, string]; // <- tuple de 2 elementos
};

type AdminPanelScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function AdminPanelScreen({ navigation }: AdminPanelScreenProps) {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    espaciosOcupados: 156,
    espaciosLibres: 44,
    ingresosHoy: 24580,
    infraccionesHoy: 12,
    usuariosActivos: 89,
    transaccionesHoy: 247,
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setDashboardData(prev => ({
        ...prev,
        espaciosOcupados: Math.floor(Math.random() * 200),
        espaciosLibres: Math.floor(Math.random() * 50),
        ingresosHoy: Math.floor(Math.random() * 50000),
        infraccionesHoy: Math.floor(Math.random() * 20),
      }));
      setRefreshing(false);
    }, 2000);
  }, []);

  const menuItems: MenuItemType[] = [
    {
      title: 'Dashboard General',
      subtitle: 'Estadísticas en tiempo real',
      icon: 'stats-chart-outline',
      screen: 'AdminDashboard',
      color: ['#72C8A8', '#2E7BDC'],
    },
    {
      title: 'Gestión de Estacionamientos',
      subtitle: 'Administrar espacios',
      icon: 'car-outline',
      screen: 'ParkingManagement',
      color: ['#5CB3CC', '#72C8A8'],
    },
    {
      title: 'Usuarios Activos',
      subtitle: 'Consultar y gestionar usuarios',
      icon: 'people-outline',
      screen: 'UserManagement',
      color: ['#2E7BDC', '#5CB3CC'],
    },
    {
      title: 'Registro Manual',
      subtitle: 'Registrar vehículos sin app',
      icon: 'add-circle-outline',
      screen: 'ManualRegistration',
      color: ['#FFC857', '#72C8A8'],
    },
    {
      title: 'Transacciones y Saldo',
      subtitle: 'Gestión financiera',
      icon: 'wallet-outline',
      screen: 'FinancialManagement',
      color: ['#72C8A8', '#2E7BDC'],
    },
    {
      title: 'Infracciones',
      subtitle: 'Multas y sanciones',
      icon: 'warning-outline',
      screen: 'InfractionManagement',
      color: ['#E74C3C', '#C0392B'],
    },
  ];

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: keyof typeof Ionicons.glyphMap;
    colors: [string, string]; // <- tuple
    subtitle?: string;
  }> = ({ title, value, icon, colors, subtitle }) => (
    <LinearGradient colors={colors} style={styles.statCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <View style={styles.statHeader}>
        <Ionicons name={icon} size={24} color="white" />
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statTitle}>{title}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </LinearGradient>
  );

  const MenuItem: React.FC<{ item: MenuItemType }> = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        if (item.screen === 'ManualRegistration') {
          navigation.navigate('ManualRegistration');
        } else {
          Alert.alert('Funcionalidad', `Navegando a ${item.title}`);
        }
      }}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={item.color as [string, string]} // <- forzado tuple
        style={styles.menuItemGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.menuItemContent}>
          <View style={styles.menuItemIcon}>
            <Ionicons name={item.icon} size={32} color="white" />
          </View>
          <View style={styles.menuItemText}>
            <Text style={styles.menuItemTitle}>{item.title}</Text>
            <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <LinearGradient colors={['#E74C3C', '#C0392B'] as [string, string]} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.adminAvatar}>
            <Ionicons name="person" size={32} color="white" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Panel Administrador</Text>
            <Text style={styles.headerSubtitle}>Sistema ParkApp</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={() => Alert.alert('Notificaciones', 'Sin notificaciones nuevas')}>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Resumen en Tiempo Real</Text>
        <View style={styles.statsGrid}>
          <StatCard title="Espacios Ocupados" value={dashboardData.espaciosOcupados} icon="car" colors={['#72C8A8', '#5CB3CC']} />
          <StatCard title="Espacios Libres" value={dashboardData.espaciosLibres} icon="car-outline" colors={['#5CB3CC', '#72C8A8']} />
          <StatCard title="Ingresos Hoy" value={`$${dashboardData.ingresosHoy.toLocaleString()}`} icon="wallet" colors={['#FFC857', '#72C8A8']} />
          <StatCard title="Infracciones Hoy" value={dashboardData.infraccionesHoy} icon="warning" colors={['#E74C3C', '#C0392B']} />
        </View>
      </View>

      <View style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>Gestión del Sistema</Text>
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </View>

      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate('ManualRegistration')}>
            <LinearGradient colors={['#FFC857', '#72C8A8'] as [string, string]} style={styles.quickActionGradient}>
              <Ionicons name="add-circle" size={28} color="white" />
              <Text style={styles.quickActionText}>Registro{'\n'}Manual</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionButton} onPress={() => Alert.alert('Multas', 'Gestión de infracciones')}>
            <LinearGradient colors={['#E74C3C', '#C0392B'] as [string, string]} style={styles.quickActionGradient}>
              <Ionicons name="warning" size={28} color="white" />
              <Text style={styles.quickActionText}>Nueva{'\n'}Infracción</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionButton} onPress={() => Alert.alert('Reportes', 'Generar reportes')}>
            <LinearGradient colors={['#2E7BDC', '#5CB3CC'] as [string, string]} style={styles.quickActionGradient}>
              <Ionicons name="document-text" size={28} color="white" />
              <Text style={styles.quickActionText}>Generar{'\n'}Reporte</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20 },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  adminAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerText: { flex: 1 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  headerSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  notificationButton: { padding: 10 },
  statsContainer: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: {
    width: (width - 50) / 2,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  statTitle: { fontSize: 14, color: 'white', fontWeight: '600' },
  statSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  menuContainer: { padding: 20, paddingTop: 0 },
  menuItem: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuItemGradient: { padding: 16 },
  menuItemContent: { flexDirection: 'row', alignItems: 'center' },
  menuItemIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemText: { flex: 1 },
  menuItemTitle: { fontSize: 16, fontWeight: 'bold', color: 'white' },
  menuItemSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  quickActionsContainer: { padding: 20, paddingTop: 0, paddingBottom: 40 },
  quickActionsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  quickActionButton: {
    width: (width - 60) / 3,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionGradient: { padding: 15, alignItems: 'center', minHeight: 80, justifyContent: 'center' },
  quickActionText: { color: 'white', fontSize: 12, fontWeight: '600', textAlign: 'center', marginTop: 8 },
});
