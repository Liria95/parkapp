import { useState } from 'react';
import { colors } from '../utils';
import { DIMENSIONES, AUTH_ROUTES } from '../utils';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, Pressable, TouchableOpacity, Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

export default function AdminPanel () {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [activeTab, setActiveTab] = useState<'dashboard' | 'espacios' | 'usuarios'| 'adminpanel'>('dashboard');

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
    
    return (
        <>
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Admin - Sistema ParkApp</Text>
                    <Text style={styles.headerSubtitle}>Panel de Administración</Text>
                </View>
                <TouchableOpacity style={styles.menuButton} onPress={() => Alert.alert('Menú', 'Editar perfil\nNotificaciones\nConfiguración')}>
                    <Ionicons name="person-outline" size={20 * DIMENSIONES.SCALE} color={colors.white} />
                </TouchableOpacity>
            </View>


            <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>A</Text>
            </View>
            <View> 
                <TouchableOpacity style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Dashboard General</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Gestión de Estacionamientos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Usuarios Activos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Transacciones y saldos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Infracciones</Text>
                </TouchableOpacity>
            </View>

        </View> 
            <View style={styles.bottomNavigation}>
                <TouchableOpacity onPress={() =>handleNavigation('adminpanel')} style={styles.navItem}>
                    <Ionicons name="briefcase-outline" size={22 * DIMENSIONES.SCALE} color={activeTab === 'adminpanel' ? colors.primary : colors.gray} />
                    <Text style={styles.iconTitle}>ADMIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>handleNavigation('dashboard')} style={styles.navItem}>
                    <Ionicons name="grid-outline" size={22 * DIMENSIONES.SCALE} color={activeTab === 'dashboard' ? colors.primary : colors.gray} />
                    <Text style={styles.iconTitle}>DASHBOARD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="car-outline" size={22 * DIMENSIONES.SCALE} color={activeTab === 'espacios' ? colors.primary : colors.gray} />
                    <Text style={styles.iconTitle}>ESPACIOS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="people-outline" size={22 * DIMENSIONES.SCALE} color={activeTab === 'usuarios' ? colors.primary : colors.gray} />
                    <Text style={styles.iconTitle}>USUARIOS</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    avatarPlaceholder: {
        width: 80,                      
        height: 80,                      
        borderRadius: 40,                 
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -40,     // 👈 lo sube y lo superpone al header
        marginBottom: 20,   // espacio hacia las cards
        alignSelf: 'center', // lo centra en horizontal
        borderWidth: 3,     // 👈 opcional: borde que lo separa del header
        borderColor: colors.white, // 👈 hace que “flote” mejor
        
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.white,
    },
    bottomNavigation: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        padding: 12 * DIMENSIONES.SCALE,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.lightGray,
    },
    header: {
        backgroundColor: colors.primary,
        padding: DIMENSIONES.HEIGHT * 0.06,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerContent: {
        flex: 1,
    },
    headerTitle: { color: colors.white, fontSize: 18 * DIMENSIONES.SCALE, fontWeight: 'bold' },
    headerSubtitle: { color: colors.white, fontSize: 14 * DIMENSIONES.SCALE, opacity: 0.9, marginTop: 2 * DIMENSIONES.SCALE },
    menuButton: {
        width: 40 * DIMENSIONES.SCALE,
        height: 40 * DIMENSIONES.SCALE,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20 * DIMENSIONES.SCALE,
        justifyContent: 'center',
        alignItems: 'center',
  },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8 * DIMENSIONES.SCALE,
    },
    sectionCard: {
        alignItems: 'center',
        padding: 12,
        borderWidth: 2,
        borderColor: colors.primary,
        borderStyle: 'dashed',
        backgroundColor: colors.white,
        marginTop: 0,
        marginRight: DIMENSIONES.WIDTH * 0.05,
        marginBottom: 15,
        marginLeft: DIMENSIONES.WIDTH * 0.05,
        borderRadius: 12 * DIMENSIONES.SCALE,
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.08,
        shadowRadius: 4,

    },
    sectionTitle: {
        fontSize: (16 * DIMENSIONES.SCALE),
        fontWeight: 'bold',
        color: colors.dark,    
    },
    iconTitle: {
        fontSize: 10 * DIMENSIONES.SCALE, 
        fontWeight: '500', 
        marginTop: 4, 
        textAlign: 'center', 
        //color: activeTab === 'usuarios' ? colors.primary : colors.gray
    }
})