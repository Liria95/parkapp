import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GLOBAL_STYLES, COLORS } from './styles';

// ---------- HomeScreen ----------
function HomeScreen({ navigation }) {
  const [tiempo, setTiempo] = useState(0);
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    let intervalo = null;
    if (activo) {
      intervalo = setInterval(() => setTiempo(t => t + 1), 1000);
    } else if (!activo && intervalo) {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [activo]);

  const guardarTiempo = async (segundos) => {
    try {
      const historial = JSON.parse(await AsyncStorage.getItem('historial')) || [];
      const fecha = new Date().toLocaleString();
      historial.push({ fecha, tiempo: segundos });
      await AsyncStorage.setItem('historial', JSON.stringify(historial));
      alert('Estacionamiento guardado!');
    } catch (error) {
      console.log(error);
    }
  };

  const reiniciar = () => {
    setActivo(false);
    guardarTiempo(tiempo);
    setTiempo(0);
  };

  const formatoTiempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <View style={GLOBAL_STYLES.container}>
      <Image source={require('./assets/logo.png')} style={{ width: 400, height: 200, marginBottom: 20, resizeMode: 'contain' }} />
      <Text style={GLOBAL_STYLES.title}>Bienvenido a ParkApp</Text>
      <Text style={GLOBAL_STYLES.timer}>{formatoTiempo(tiempo)}</Text>

      <View style={GLOBAL_STYLES.buttons}>
        <Button 
          title={activo ? "Pausar" : "Iniciar"} 
          onPress={() => setActivo(!activo)} 
          color={COLORS.verde} 
        />
        <Button 
          title="Finalizar" 
          onPress={reiniciar} 
          color={COLORS.rojo} 
        />
      </View>

      <View style={GLOBAL_STYLES.navButtons}>
        <Button title="Ver Historial" onPress={() => navigation.navigate('Historial')} color={COLORS.azul} />
        <View style={{ marginTop: 10 }}>
          <Button title="Registrar Estacionamiento" onPress={() => navigation.navigate('Registro')} color={COLORS.azul} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button title="Ajustes" onPress={() => navigation.navigate('Ajustes')} color={COLORS.azul} />
        </View>
      </View>
    </View>
  );
}

// ---------- HistorialScreen ----------
function HistorialScreen() {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const cargarHistorial = async () => {
      const data = JSON.parse(await AsyncStorage.getItem('historial')) || [];
      setHistorial(data);
    };
    cargarHistorial();
  }, []);

  return (
    <View style={GLOBAL_STYLES.container}>
      <Text style={GLOBAL_STYLES.subtitle}>Historial de Estacionamientos</Text>
      <FlatList 
        data={historial}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={GLOBAL_STYLES.text}>
            {item.fecha} - {Math.floor(item.tiempo/60)}:{item.tiempo%60} min
          </Text>
        )}
      />
    </View>
  );
}

// ---------- RegistroScreen ----------
function RegistroScreen() {
  return (
    <View style={GLOBAL_STYLES.container}>
      <Text style={GLOBAL_STYLES.subtitle}>Registro de Estacionamiento</Text>
      <Text style={GLOBAL_STYLES.text}>Aquí podrás agregar ubicación y foto del vehículo.</Text>
    </View>
  );
}

// ---------- AjustesScreen ----------
function AjustesScreen() {
  return (
    <View style={GLOBAL_STYLES.container}>
      <Text style={GLOBAL_STYLES.subtitle}>Ajustes</Text>
      <Text style={GLOBAL_STYLES.text}>Aquí podrás configurar alertas y notificaciones.</Text>
    </View>
  );
}

// ---------- Navegación ----------
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Historial" component={HistorialScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Ajustes" component={AjustesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
