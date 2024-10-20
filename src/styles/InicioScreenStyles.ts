import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCounterContainer: {
    backgroundColor: '#292929',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row', // Cambiado a row para alinear horizontalmente
    alignItems: 'center', // Alinea los elementos en el centro verticalmente
    justifyContent: 'space-between', // Espaciado entre los elementos
    width: '100%',
    marginBottom: 30,
  },
  stepCountContainer: {
    flexDirection: 'row', // Alinea el número de pasos y la etiqueta "Pasos"
    alignItems: 'flex-end', // Alinea el número de pasos y la etiqueta en la parte inferior
  },
  stepCount: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#fff',
  },
  stepLabel: {
    fontSize: 20,
    color: '#ccc',
    marginLeft: 10, // Espacio entre el número de pasos y la etiqueta
    marginTop: 5, // Ajusta este valor para subir o bajar la etiqueta "Pasos"
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailValue: {
    fontSize: 24,
    color: '#fff',
  },
  detailLabel: {
    fontSize: 14,
    color: '#aaa',
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
   },

  progressBarContainer: {
    width: 30,
    height: 100, 
    backgroundColor: '#444',
    borderRadius: 5,
    justifyContent: 'flex-end', 
    overflow: 'hidden',
  },
  progressBar: {
    width: '100%',
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  stepsText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  defaultDay: {
    color: '#aaa', // Color gris para los demás días
    fontSize: 14,
    marginTop: 8,

  },

  currentDay: {
    color: '#FF7F50', // Color blanco para el día actual
    fontWeight: 'bold', // Texto en negrita para el día actual
    marginTop: 8,
  },
  
  averageSteps: {
    color: '#aaa',
    fontSize: 18,
    marginTop: 16,
  },
  pauseButton: {
    padding: 10,
 
  },
  pauseButtonIcon: {
    width: 24, // Ajusta el tamaño del ícono según sea necesario
    height: 24,
    top: 40,

  },
});
