import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCounterContainer: {
    backgroundColor: '#292929',
    paddingVertical: 30,
    paddingHorizontal: 50,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  stepCount: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#fff',
  },
  stepLabel: {
    fontSize: 20,
    color: '#ccc',
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
    paddingVertical: 10,
  },
  currentDay: {
    color: '#fff', // Color blanco para el día actual
    fontWeight: 'bold', // Texto en negrita para el día actual
  },
  defaultDay: {
    color: '#aaa', // Color gris para los demás días
  },
  dayLabel: {
    fontSize: 14,
  },
  averageSteps: {
    fontSize: 16,
    color: '#aaa',
  },

  pauseButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  pauseButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
