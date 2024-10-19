import React, { useEffect, useState } from 'react';
import { View, Text, NativeModules, NativeEventEmitter, PermissionsAndroid, Platform, Button, TouchableOpacity } from 'react-native';
import moment from 'moment'; // para manejar fechas
import 'moment/locale/es'; // para configurar a español
import { styles } from '../styles/InicioScreenStyles'; 

const { StepCounterModule } = NativeModules;
const stepCounterEmitter = new NativeEventEmitter(StepCounterModule);

const requestActivityRecognitionPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 29) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permiso de reconocimiento de actividad concedido');
    } else {
      console.log('Permiso denegado');
    }
  }
};

const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const STEP_LENGTH_METERS = 0.75; // Longitud promedio de un paso en metros
const SECONDS_PER_STEP = 0.5; // Tiempo estimado por cada paso en segundos

const InicioScreen = () => {
  const [stepCount, setStepCount] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0.0); // Distancia en kilómetros
  const [timeInSeconds, setTimeInSeconds] = useState(0); // Tiempo en segundos
  const [isPaused, setIsPaused] = useState(false); // Estado de pausa
  const [todayIndex, setTodayIndex] = useState(moment().day() === 0 ? 6 : moment().day() - 1); // Día de hoy en abreviación

  useEffect(() => {
    const requestPermission = async () => {
      await requestActivityRecognitionPermission(); // Solicitar permiso
    };

    requestPermission(); // Llamar a la función para solicitar permisos

    const subscription = stepCounterEmitter.addListener('StepCountChanged', (steps: number) => {
      if (!isPaused) {
        setStepCount(steps);
        // Calcula la distancia en kilómetros
        const distance = (steps * STEP_LENGTH_METERS) / 1000;
        setDistanceKm(parseFloat(distance.toFixed(2)));

        // Calcula el tiempo basado en los pasos
        const totalTime = Math.floor(steps * SECONDS_PER_STEP);
        setTimeInSeconds(totalTime);
      }
    });

    StepCounterModule.startStepCounting(); // Comienza a contar pasos

    return () => {
      subscription.remove(); // Limpiar el listener al desmontar
      StepCounterModule.stopStepCounting(); // Detener el conteo de pasos
    };
  }, [isPaused]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const handlePauseToggle = () => {
    setIsPaused(!isPaused); // Alterna el estado de pausa
  };

  return (
    <View style={styles.container}>
      {/* Ventana de contador de pasos */}
      <View style={styles.stepCounterContainer}>
        <Text style={styles.stepCount}>{stepCount}</Text>
        <Text style={styles.stepLabel}>Paso</Text>
      </View>

      {/* Detalles: Kilómetros, Kcal, Tiempo */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailValue}>{distanceKm}</Text>
          <Text style={styles.detailLabel}>Kilómetros</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailValue}>0.0</Text>
          <Text style={styles.detailLabel}>Kcal</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailValue}>{formatTime(timeInSeconds)}</Text>
          <Text style={styles.detailLabel}>Tiempo</Text>
        </View>
      </View>

        {/* Calendario de la semana */}
       <View style={styles.calendarContainer}>
        {daysOfWeek.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={todayIndex === index ? styles.currentDay : styles.defaultDay}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Media diaria */}
      <Text style={styles.averageSteps}>Media diaria: 0</Text>

      {/* Botón de Pausa */}
      <TouchableOpacity onPress={handlePauseToggle} style={styles.pauseButton}>
  <Text style={styles.pauseButtonText}>{isPaused ? 'Reanudar' : 'Pausar'}</Text>
</TouchableOpacity>

    </View>
  );
};

export default InicioScreen;
