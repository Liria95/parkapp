import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { COLORS } from '../../utils/colors';
import { globalStyles } from '../../styles/globalStyles';

export default function InfractionManagementScreen() {
  const [activeTab, setActiveTab] = useState('pendientes');
  const [infracciones] = useState([
    {
      id: '001234',
      patente: 'ABC123',
      motivo: 'Tiempo excedido',
      monto: 2500.00,
      fecha: '30/08/2025 14:30',
      estado: 'pendiente',
      usuario: 'Juan Pérez',
      ubicacion: 'Av. San Martín 123',
    },
    {
      id: '001235',
      patente: 'XYZ789',
      motivo: 'Estacionamiento sin registro',
      monto: 1800.00,
      fecha: '30/08/2025 10:15',
      estado: 'pendiente',
      usuario: 'María García',
      ubicacion: 'Plaza Central',
    },
    {
      id: '001233',
      patente: 'DEF456',
      motivo: 'Sin registro en la app',
      monto: 1800.00,
      fecha: '29/08/2025 10:15',
      estado: 'pagada',
      usuario: 'Carlos López',
      ubicacion: 'Calle Rivadavia 456',
    },
    {
      id: '001232',
      patente: 'GHI789',
      motivo: 'Tiempo excedido',
      monto: 2000.00,
      fecha: '29/08/2025 16:45',
      estado: 'pagada',
      usuario: 'Ana Rodríguez',
      ubicacion: 'Av. Libertador 890',
    },
  ]);

  const filteredInfracciones = infracciones.filter(infraccion =>
    activeTab === 'todas' ? true : infraccion.estado === activeTab
  );

  const handleGestionarInfraccion = (infraccion) => {
    if (infraccion.estado === 'pagada') {
      Alert.alert(
        `Infracción #${infraccion.id}`,
        `Estado: PAGADA\nPatente: ${infraccion.patente}\nMotivo: ${infraccion.motivo}\nMonto: ${infraccion.monto.toFixed(2)}\nFecha: ${infraccion.fecha}`
      );
      return;
    }

    Alert.alert(
      `Gestionar Infracción #${infraccion.id}`,
      `Patente: ${infraccion.patente}\nMotivo: ${infraccion.motivo}\nMonto: ${infraccion.monto.toFixed(2)}\nUsuario: ${infraccion.usuario}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Marcar como Pagada',
          onPress: () => Alert.alert('Éxito', 'Infracción marcada como pagada'),
        },
        {
          text: 'Aplicar Descuento',
          onPress: () => Alert.alert('Descuento', 'Descuento del 20% aplicado'),
        },
        {
          text: 'Anular Multa',
          style: 'destructive',
          onPress: () => Alert.alert('Multa Anulada', 'La multa ha sido anulada'),
        },
      ]
    );
  };

  const handleNuevaMulta = () => {
    Alert.alert(
      'Nueva Infracción',
      '¿Cómo quieres crear la multa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Escanear Patente',
          onPress: () => Alert.alert('Cámara', 'Abrir cámara para escanear patente...'),
        },
        {
          text: 'Buscar Usuario',
          onPress: () => Alert.alert('Buscar', 'Buscar usuario en el sistema...'),
        },
        {
          text: 'Ingreso Manual',
          onPress: () => Alert.alert('Manual', 'Formulario de ingreso manual...'),
        },
      ]
    );
  };

  const renderInfraccion = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.infraccionCard,
        {
          backgroundColor: item.estado === 'pagada' ? COLORS.success + '10' : COLORS.danger + '10',
          borderLeftColor: item.estado === 'pagada' ? COLORS.success : COLORS.danger,
        }
      ]}
      onPress={() => handleGestionarInfraccion(item)}
    >
      <View style={styles.infraccionHeader}>
        <Text style={[
          styles.infraccionId,
          { color: item.estado === 'pagada' ? COLORS.success : COLORS.danger }
        ]}>
          {item.estado === 'pagada' ? '✅' : '🚨'} Infracción #{item.id}
        </Text>
        <View style={[
          styles.estadoBadge,
          {
            backgroundColor: item.estado === 'pagada' ? COLORS.success : COLORS.warning,
          }
        ]}>
          <Text style={styles.estadoText}>
            {item.estado === 'pagada' ? 'PAGADA' : 'PENDIENTE'}
          </Text>
        </View>
      </View>

      <View style={styles.infraccionDetails}>
        <Text style={styles.infraccionDetalle}>
          <Text style={styles.detailLabel}>Patente:</Text> {item.patente}
        </Text>
        <Text style={styles.infraccionDetalle}>
          <Text style={styles.detailLabel}>Usuario:</Text> {item.usuario}
        </Text>
        <Text style={styles.infraccionDetalle}>
          <Text style={styles.detailLabel}>Motivo:</Text> {item.motivo}
        </Text>
        <Text style={styles.infraccionDetalle}>
          <Text style={styles.detailLabel}>Ubicación:</Text> {item.ubicacion}
        </Text>
        <Text style={styles.infraccionDetalle}>
          <Text style={styles.detailLabel}>Monto:</Text> ${item.monto.toFixed(2)}
        </Text>
        <Text style={styles.infraccionDetalle}>
          <Text style={styles.detailLabel}>Fecha:</Text> {item.fecha}
        </Text>
      </View>

      {item.estado === 'pendiente' && (
        <TouchableOpacity
          style={styles.gestionarButton}
          onPress={() => handleGestionarInfraccion(item)}
        >
          <Text style={styles.gestionarButtonText}>Gestionar</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.title}>🚨 Gestión de Infracciones</Text>
        
        {/* Botones de Acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[globalStyles.buttonPrimary, { flex: 1, marginRight: 5 }]}
            onPress={handleNuevaMulta}
          >
            <Text style={globalStyles.buttonTextPrimary}>➕ Nueva Multa</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[globalStyles.buttonSecondary, { flex: 1, marginLeft: 5 }]}
            onPress={() => Alert.alert('Reportes', 'Generar reporte de infracciones...')}
          >
            <Text style={globalStyles.buttonTextSecondary}>📋 Reportes</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'pendientes' && styles.activeTab]}
          onPress={() => setActiveTab('pendientes')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'pendientes' && styles.activeTabText
          ]}>
            Pendientes ({infracciones.filter(i => i.estado === 'pendiente').length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'pagada' && styles.activeTab]}
          onPress={() => setActiveTab('pagada')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'pagada' && styles.activeTabText
          ]}>
            Pagadas ({infracciones.filter(i => i.estado === 'pagada').length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'todas' && styles.activeTab]}
          onPress={() => setActiveTab('todas')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'todas' && styles.activeTabText
          ]}>
            Todas ({infracciones.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Infracciones */}
      <View style={styles.listContainer}>
        <FlatList
          data={filteredInfracciones}
          renderItem={renderInfraccion}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
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
  actionButtons: {
    flexDirection: 'row',
    marginTop: 15,
    width: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: COLORS.danger,
  },
  tabText: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: COLORS.danger,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infraccionCard: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: COLORS.gray + '20',
  },
  infraccionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infraccionId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  estadoBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  estadoText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  infraccionDetails: {
    marginBottom: 10,
  },
  infraccionDetalle: {
    fontSize: 12,
    color: COLORS.gray,
    marginVertical: 1,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  gestionarButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignSelf: 'flex-end',
  },
  gestionarButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});