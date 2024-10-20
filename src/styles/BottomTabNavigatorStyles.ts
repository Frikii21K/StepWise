import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#292929', // Color oscuro para la barra de navegación inferior
  },
  tabBarActiveTintColor: {
    color: '#FF7F50', // Color blanco para el icono activo
  },
  tabBarInactiveTintColor: {
    color: '#ccc', // Color gris claro para los iconos inactivos
  },
  icon: {
    width: 24,
    height: 24,
  },
  headerContainer: {
    backgroundColor: '#292929', // Color oscuro para el header
    padding: 10,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#444',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerDate: {
    fontSize: 16,
    color: '#ccc',
  },
});
