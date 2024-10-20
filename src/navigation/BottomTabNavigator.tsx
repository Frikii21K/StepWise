import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import InicioScreen from '../screens/InicioScreen';
import InformeScreen from '../screens/InformeScreen';
import SaludScreen from '../screens/SaludScreen';
import PerfilScreen from '../screens/PerfilScreen';
import { styles } from '../styles/BottomTabNavigatorStyles'; // Importamos los estilos

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  // Referencias a las animaciones de cada icono
  const inicioAnimation = useRef(new Animated.Value(1)).current;
  const informeAnimation = useRef(new Animated.Value(1)).current;
  const saludAnimation = useRef(new Animated.Value(1)).current;
  const perfilAnimation = useRef(new Animated.Value(1)).current;

  // Función para manejar la animación push
  const handleIconPress = (animation: Animated.Value, navigation: any, routeName: string) => {
     navigation.navigate(routeName);

    // Ejecutar la animación
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,  
        tabBarActiveTintColor: styles.tabBarActiveTintColor.color, // Color activo
        tabBarInactiveTintColor: styles.tabBarInactiveTintColor.color, // Color inactivo
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={InicioScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <TouchableWithoutFeedback
              onPress={() => handleIconPress(inicioAnimation, navigation, 'Inicio')}
            >
              <Animated.View style={{ transform: [{ scale: inicioAnimation }] }}>
                <Image
                  source={require('../assets/ic_home.webp')}
                  style={[
                    styles.icon,
                    { tintColor: focused ? styles.tabBarActiveTintColor.color : styles.tabBarInactiveTintColor.color }
                  ]}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          ),
          header: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Hoy</Text>
              <Text style={styles.headerDate}>
                {new Date().toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Informe"
        component={InformeScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <TouchableWithoutFeedback
              onPress={() => handleIconPress(informeAnimation, navigation, 'Informe')}
            >
              <Animated.View style={{ transform: [{ scale: informeAnimation }] }}>
                <Image
                  source={require('../assets/ic_statistics.webp')}
                  style={[
                    styles.icon,
                    { tintColor: focused ? styles.tabBarActiveTintColor.color : styles.tabBarInactiveTintColor.color }
                  ]}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          ),
        })}
      />
      <Tab.Screen
        name="Salud"
        component={SaludScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <TouchableWithoutFeedback
              onPress={() => handleIconPress(saludAnimation, navigation, 'Salud')}
            >
              <Animated.View style={{ transform: [{ scale: saludAnimation }] }}>
                <Image
                  source={require('../assets/ic_health.webp')}
                  style={[
                    styles.icon,
                    { tintColor: focused ? styles.tabBarActiveTintColor.color : styles.tabBarInactiveTintColor.color }
                  ]}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          ),
        })}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <TouchableWithoutFeedback
              onPress={() => handleIconPress(perfilAnimation, navigation, 'Perfil')}
            >
              <Animated.View style={{ transform: [{ scale: perfilAnimation }] }}>
                <Image
                  source={require('../assets/ic_profile.webp')}
                  style={[
                    styles.icon,
                    { tintColor: focused ? styles.tabBarActiveTintColor.color : styles.tabBarInactiveTintColor.color }
                  ]}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
