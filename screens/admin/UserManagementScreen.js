import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { COLORS } from '../../utils/colors';
import { globalStyles } from '../../styles/globalStyles';

export default function UserManagementScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [usuarios] = useState([
    {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan@email.com',
      patente: 'ABC123',
      saldo: 1250.00,
      estadoActual: 'Estacionado',
      ubicacion: 'Av. San Martín 123',
      activo: true,
    },
    {
      id: 2,
      nombre: 'María García',
      email: 'maria@email.com',
      patente: 'XYZ789',
      saldo: 850.00,
      estadoActual: 'Inactivo',
      ubicacion: null,
      activo: true,
    },
    {
      id: 3,
      nombre: 'Carlos López',
      email: 'carlos@email.com',
      patente: 'DEF456',
      saldo: 0.00,
      estadoActual: 'Saldo agotado',
      ubicacion: null,
      activo: false,
    },
    {
      id: 4,
      nombre: 'Ana Rodríguez',
      email: 'ana@email.com',
      patente: 'GHI789',
      saldo: 2100.50,
      estadoActual: 'Inactivo',
      ubicacion: null,
      activo: true,
    },
  ]);

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    usuario.patente.toLowerCase().includes(searchText.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleViewUser = (usuario) => {
    Alert.alert(
      `Usuario: ${usuario.nombre}`,
      `Email: ${usuario.email}\nPatente: ${usuario.patente}\nSaldo: ${usuario.saldo.toFixed(2)}\nEstado: ${usuario.estadoActual}\n${usuario.ubicacion ? `Ubicación: ${usuario.ubicacion}` : ''}`,
      [
        { text: 'Cerrar', style: 'cancel' },
        {
          text: 'Gestionar Saldo',
          onPress: () => handleManageSaldo(usuario),
        },
        {
          text: 'Ver Historial',
          onPress: () => Alert.alert('Historial', `Historial de ${usuario.nombre}:\n\n- Último estacionamiento: 30/08\n- Infracciones: 0\n- Total gastado: $2,450.00`),
        },
      ]
    );
  };

  const handleManageSaldo = (usuario) => {
    Alert.alert(
      'Gestionar Saldo',
      `Saldo actual de ${usuario.nombre}: ${usuario.saldo.toFixed(2)}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Agregar Saldo',
          onPress: () => Alert.alert('Saldo Agregado', 'Se agregaron $500.00 al saldo del usuario'),
        },
        {
          text: 'Ajustar Saldo',
          onPress: () => Alert.alert('Saldo Ajustado', 'Saldo ajustado correctamente'),
        },
      ]
    );
  };

  const renderUsuario = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.usuarioCard,
        { opacity: item.activo ? 1 : 0.7 }
      ]}
      onPress={() => handleViewUser(item)}
    >
      <View style={styles.usuarioInfo}>
        <Text style={styles.usuarioNombre}>{item.nombre}</Text>
        <Text style={styles.usuarioDetalle}>🚗 {item.patente} | 💰 ${item.saldo.toFixed(2)}</Text>
        <Text style={[
          styles.usuarioEstado,
          {
            color: item.estadoActual === 'Estacionado' ? COLORS.warning :
                   item.estadoActual === 'Saldo agotado' ? COLORS.danger :
                   COLORS.success
          }
        ]}>
          📍 {item.estadoActual}
          {item.ubicacion && ` - ${item.ubicacion}`}
        </Text>
      </View>
      
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => handleViewUser(item)}
      >
        <Text style={styles.viewButtonText}>Ver</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.title}>👥 Gestión de Usuarios</Text>
      </View>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="🔍 Buscar por nombre, patente o email"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Estadísticas Rápidas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{usuarios.length}</Text>
          <Text style={styles.statLabel}>Total Usuarios</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{usuarios.filter(u => u.estadoActual === 'Estacionado').length}</Text>
          <Text style={styles.statLabel}>Activos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>${usuarios.reduce((sum, u) => sum + u.saldo, 0).toFixed(0)}</Text>
          <Text style={styles.statLabel}>Saldo Total</Text>
        </View>
      </View>

      {/* Lista de Usuarios */}
      <View style={styles.listContainer}>
        <FlatList
          data={filteredUsuarios}
          renderItem={renderUsuario}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Botón de Registro Manual */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={globalStyles.buttonSecondary}
          onPress={() => Alert.alert('Registro Manual', 'Función de registro manual de usuario')}
        >
          <Text style={globalStyles.buttonTextSecondary}>➕ Registrar Usuario Manualmente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  searchContainer: {
    padding: 20,
    paddingTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: COLORS.danger + '20',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.danger,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  usuarioCard: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray + '20',
  },
  usuarioInfo: {
    flex: 1,
  },
  usuarioNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  usuarioDetalle: {
    fontSize: 12,
    color: COLORS.gray,
    marginVertical: 2,
  },
  usuarioEstado: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  viewButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  viewButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionContainer: {
    padding: 20,
  },
});