// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text } from 'react-native';
import InicioScreen from '../screens/InicioScreen';
import InformeScreen from '../screens/InformeScreen';
import SaludScreen from '../screens/SaludScreen';
import PerfilScreen from '../screens/PerfilScreen';
import { styles } from '../styles/BottomTabNavigatorStyles'; 

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Inicio">
      <Tab.Screen 
        name="Inicio" 
        component={InicioScreen} 
        options={{
          tabBarIcon: () => (
            <Image source={require('../assets/ic_home.png')} style={{ width: 24, height: 24 }} />
          ),
          header: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Hoy</Text>
              <Text style={styles.headerDate}>{new Date().toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</Text>
            </View>
          ),
        }} 
      />
      <Tab.Screen 
        name="Informe" 
        component={InformeScreen} 
        options={{
          tabBarIcon: () => (
            <Image source={require('../assets/ic_statistics.png')} style={{ width: 24, height: 24 }} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Salud" 
        component={SaludScreen} 
        options={{
          tabBarIcon: () => (
            <Image source={require('../assets/ic_health.png')} style={{ width: 24, height: 24 }} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Perfil" 
        component={PerfilScreen} 
        options={{
          tabBarIcon: () => (
            <Image source={require('../assets/ic_profile.png')} style={{ width: 24, height: 24 }} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
