import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { COLORS } from '../../utils/colors';
import { globalStyles } from '../../styles/globalStyles';

type DashboardData = {
  espaciosOcupados: number;
  espaciosLibres: number;
  ingresosDia: number;
  infraccionesDia: number;
  usuariosTotales: number;
  transaccionesDia: number;
};

type DashboardCardProps = {
  icon: string;
  title: string;
  value: string | number;
  color: string;
  subtitle?: string;
};

export default function AdminDashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    espaciosOcupados: 156,
    espaciosLibres: 44,
    ingresosDia: 24580,
    infraccionesDia: 12,
    usuariosTotales: 2847,
    transaccionesDia: 145,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setDashboardData(prev => ({
        ...prev,
        espaciosOcupados: Math.floor(Math.random() * 200),
        espaciosLibres: Math.floor(Math.random() * 50),
        ingresosDia: Math.floor(Math.random() * 30000) + 20000,
        infraccionesDia: Math.floor(Math.random() * 20),
      }));
      setRefreshing(false);
    }, 2000);
  }, []);

  const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, value, color, subtitle }) => (
    <View style={[styles.dashboardCard, { borderLeftColor: color }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <View style={styles.cardInfo}>
          <Text style={[styles.cardValue, { color }]}>{value}</Text>
          <Text style={styles.cardTitle}>{title}</Text>
          {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={globalStyles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <View style={styles.adminHeader}>
          <View style={styles.adminAvatar}>
            <Text style={styles.adminAvatarText}>👨‍💼</Text>
          </View>
          <View style={styles.adminInfo}>
            <Text style={styles.adminTitle}>Panel Administrador</Text>
            <Text style={styles.adminSubtitle}>Sistema ParkApp - Tiempo Real</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>📊 Métricas en Tiempo Real</Text>
        <View style={styles.metricsGrid}>
          <DashboardCard
            icon="🚗"
            title="Espacios Ocupados"
            value={dashboardData.espaciosOcupados}
            color={COLORS.accent}
            subtitle={`${((dashboardData.espaciosOcupados / (dashboardData.espaciosOcupados + dashboardData.espaciosLibres)) * 100).toFixed(1)}% ocupación`}
          />
          <DashboardCard
            icon="🅿️"
            title="Espacios Libres"
            value={dashboardData.espaciosLibres}
            color={COLORS.secondary}
          />
        </View>

        <View style={styles.metricsGrid}>
          <DashboardCard
            icon="💰"
            title="Ingresos Hoy"
            value={`$${dashboardData.ingresosDia.toLocaleString()}`}
            color={COLORS.warning}
            subtitle={`${dashboardData.transaccionesDia} transacciones`}
          />
          <DashboardCard
            icon="🚨"
            title="Infracciones Hoy"
            value={dashboardData.infraccionesDia}
            color={COLORS.danger}
            subtitle="Pendientes de cobro"
          />
        </View>

        <Text style={styles.sectionTitle}>📈 Ocupación del Día</Text>
        <View style={styles.chartContainer}>
          <Text style={styles.chartPlaceholder}>📊 Gráfico de Ocupación</Text>
          <Text style={styles.chartSubtext}>Pico máximo: 14:30 hs (89% ocupación)</Text>
        </View>

        <Text style={styles.sectionTitle}>🕒 Actividad Reciente</Text>
        <View style={styles.activityContainer}>
          {[
            { icon: '🚗', text: 'Nuevo estacionamiento - ABC123', time: 'Hace 2 minutos' },
            { icon: '💰', text: 'Pago recibido - $75.00', time: 'Hace 5 minutos' },
            { icon: '🚨', text: 'Nueva infracción generada', time: 'Hace 12 minutos' },
            { icon: '👤', text: 'Nuevo usuario registrado', time: 'Hace 28 minutos' },
          ].map((item, index) => (
            <View key={index} style={styles.activityItem}>
              <Text style={styles.activityIcon}>{item.icon}</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityText}>{item.text}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>⚡ Acciones Rápidas</Text>
        <View style={styles.quickActions}>
          {[
            { icon: '📝', text: 'Registro Manual' },
            { icon: '🚨', text: 'Nueva Multa' },
            { icon: '📊', text: 'Reportes' },
            { icon: '⚙️', text: 'Configurar' },
          ].map((action, index) => (
            <TouchableOpacity key={index} style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>{action.icon}</Text>
              <Text style={styles.quickActionText}>{action.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.danger,
    padding: 20,
    paddingTop: 50,
  },
  adminHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminAvatar: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  adminAvatarText: {
    fontSize: 24,
  },
  adminInfo: { flex: 1 },
  adminTitle: { color: COLORS.white, fontSize: 20, fontWeight: 'bold' },
  adminSubtitle: { color: COLORS.white, fontSize: 14, opacity: 0.9 },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.dark, marginVertical: 15 },
  metricsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  dashboardCard: {
    backgroundColor: COLORS.white,
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: { alignItems: 'center' },
  cardIcon: { fontSize: 24, marginBottom: 5 },
  cardInfo: { alignItems: 'center' },
  cardValue: { fontSize: 20, fontWeight: 'bold' },
  cardTitle: { fontSize: 12, color: COLORS.gray, textAlign: 'center' },
  cardSubtitle: { fontSize: 10, color: COLORS.gray, marginTop: 2, textAlign: 'center' },
  chartContainer: {
    backgroundColor: COLORS.white,
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.gray + '20',
  },
  chartPlaceholder: { fontSize: 18, color: COLORS.gray, fontWeight: 'bold' },
  chartSubtext: { fontSize: 12, color: COLORS.gray, marginTop: 5 },
  activityContainer: { backgroundColor: COLORS.white, borderRadius: 10, padding: 15, marginBottom: 15 },
  activityItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.light },
  activityIcon: { fontSize: 18, marginRight: 15 },
  activityInfo: { flex: 1 },
  activityText: { fontSize: 14, color: COLORS.dark, fontWeight: 'bold' },
  activityTime: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
  quickActions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  quickActionButton: {
    backgroundColor: COLORS.white,
    width: '48%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.danger + '20',
  },
  quickActionIcon: { fontSize: 24, marginBottom: 5 },
  quickActionText: { fontSize: 12, color: COLORS.dark, fontWeight: 'bold' },
});
