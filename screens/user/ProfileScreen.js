import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { COLORS } from '../../utils/colors';
import { globalStyles } from '../../styles/globalStyles';

export default function ProfileScreen({ navigation }) {
  const [userInfo] = useState({
    nombre: 'Juan Pérez',
    email: 'juan@email.com',
    telefono: '+54 11 1234-5678',
    vehiculos: ['ABC123', 'DEF456'],
    saldo: 1250.00,
    infraccionesPendientes: 0,
  });

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Sesión Cerrada', 'Hasta pronto!');
          },
        },
      ]
    );
  };

  const ProfileOption = ({ icon, title, subtitle, onPress, showArrow = true }) => (
    <TouchableOpacity style={styles.optionCard} onPress={onPress}>
      <View style={styles.optionContent}>
        <Text style={styles.optionIcon}>{icon}</Text>
        <View style={styles.optionInfo}>
          <Text style={styles.optionTitle}>{title}</Text>
          {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showArrow && <Text style={styles.optionArrow}>→</Text>}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.title}>👤 Mi Perfil</Text>
        
        {/* Avatar y Info Principal */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.userName}>{userInfo.nombre}</Text>
          <Text style={styles.userEmail}>{userInfo.email}</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Opciones del Perfil */}
        <ProfileOption
          icon="🚗"
          title="Mis Vehículos"
          subtitle={`${userInfo.vehiculos.length} vehículo(s) registrado(s)`}
          onPress={() => Alert.alert('Vehículos', `Vehículos registrados:\n${userInfo.vehiculos.join(', ')}`)}
        />

        <ProfileOption
          icon="📱"
          title="Notificaciones"
          subtitle="Configurar alertas y recordatorios"
          onPress={() => Alert.alert('Notificaciones', 'Configuración de notificaciones')}
        />

        <ProfileOption
          icon="💳"
          title="Métodos de Pago"
          subtitle="Gestionar tarjetas y cuentas"
          onPress={() => Alert.alert('Pagos', 'Gestión de métodos de pago')}
        />

        <ProfileOption
          icon="🚨"
          title="Infracciones Pendientes"
          subtitle={userInfo.infraccionesPendientes === 0 ? 'Sin infracciones' : `${userInfo.infraccionesPendientes} pendiente(s)`}
          onPress={() => Alert.alert('Infracciones', 'No tienes infracciones pendientes')}
        />

        <ProfileOption
          icon="📊"
          title="Estadísticas de Uso"
          subtitle="Ver tu historial de estacionamiento"
          onPress={() => Alert.alert('Estadísticas', 'Total gastado este mes: $1,450\nTiempo total: 24h 15min\nLugares favoritos: Av. San Martín')}
        />

        <ProfileOption
          icon="⚙️"
          title="Configuración"
          subtitle="Ajustes de la aplicación"
          onPress={() => Alert.alert('Configuración', 'Configuración de la aplicación')}
        />

        <ProfileOption
          icon="❓"
          title="Ayuda y Soporte"
          subtitle="FAQ y contacto"
          onPress={() => Alert.alert('Ayuda', 'Contacto: soporte@parkapp.com\nTeléfono: 0800-PARKAPP')}
        />

        <ProfileOption
          icon="ℹ️"
          title="Acerca de ParkApp"
          subtitle="Versión 1.0.0"
          onPress={() => Alert.alert('Acerca de', 'ParkApp v1.0.0\nDesarrollado por [Tu Grupo]\nUNER - 2025')}
        />

        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>🚪 Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.primary,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 40,
    color: COLORS.white,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  optionCard: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.gray + '20',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  optionSubtitle: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  optionArrow: {
    fontSize: 16,
    color: COLORS.gray,
  },
  logoutButton: {
    backgroundColor: COLORS.danger + '10',
    borderColor: COLORS.danger,
    borderWidth: 2,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
