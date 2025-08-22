import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistorialScreen() {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const cargarHistorial = async () => {
      const data = JSON.parse(await AsyncStorage.getItem('historial')) || [];
      setHistorial(data);
    };
    cargarHistorial();
  }, []);

  return (
    <View style={{ flex:1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Historial de Estacionamientos</Text>
      <FlatList 
        data={historial}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.fecha} - {Math.floor(item.tiempo/60)}:{item.tiempo%60} min</Text>
        )}
      />
    </View>
  );
}
