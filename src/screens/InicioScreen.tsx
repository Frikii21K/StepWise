import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, NativeModules, NativeEventEmitter, PermissionsAndroid, Platform, TouchableOpacity, Image } from 'react-native';
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
const MAX_STEPS = 10000; // Límite visual de pasos por día

const STEP_LENGTH_METERS = 0.75; // Longitud promedio de un paso en metros
const SECONDS_PER_STEP = 0.5; // Tiempo estimado por cada paso en segundos

const InicioScreen = () => {
  const [stepCount, setStepCount] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0.0); // Distancia en kilómetros
  const [timeInSeconds, setTimeInSeconds] = useState(0); // Tiempo en segundos
  const [isPaused, setIsPaused] = useState(false); // Estado de pausa
  const [todayIndex, setTodayIndex] = useState(moment().day() === 0 ? 6 : moment().day() - 1); // Día de hoy en abreviación
  const [weekSteps, setWeekSteps] = useState(Array(7).fill(0)); // Pasos por día de la semana

  const updateTodayIndex = useCallback(() => {
    const currentDayIndex = moment().day() === 0 ? 6 : moment().day() - 1; // Obtener el índice del día actual
    if (currentDayIndex !== todayIndex) {
      setTodayIndex(currentDayIndex); // Actualizar el día actual
    }
  }, [todayIndex]);

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
      // Actualizar los pasos del día actual
        setWeekSteps(prevSteps => {
          const newSteps = [...prevSteps];
          newSteps[todayIndex] = steps;
          return newSteps;
        });
      }
    });

    StepCounterModule.startStepCounting(); // Comienza a contar pasos

    // Función para verificar el cambio de día cada minuto
    const checkDayChange = () => {
      updateTodayIndex();
      setTimeout(checkDayChange, 60000); // Verificar cada minuto
    };

    checkDayChange();  

    return () => {
      subscription.remove(); // Limpiar el listener al desmontar
      StepCounterModule.stopStepCounting(); // Detener el conteo de pasos
    };
  }, [isPaused, updateTodayIndex]);

  const formatTime = useCallback((seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  }, []);

  const handlePauseToggle = () => {
    setIsPaused((prev) => !prev); // Alterna el estado de pausa
  };

  return (
    <View style={styles.container}>
      {/* Ventana de contador de pasos */}
      <View style={styles.stepCounterContainer}>
        <View style={styles.stepCountContainer}>
          <Text style={styles.stepCount}>{stepCount}</Text>
          <Text style={styles.stepLabel}>Pasos</Text>
        </View>
        {/* Botón de Pausa */}
        <TouchableOpacity onPress={handlePauseToggle} style={styles.pauseButton}>
          <Image
            source={isPaused ? require('../assets/play-light.webp') : require('../assets/pause-light.webp')}
            style={styles.pauseButtonIcon}
          />
        </TouchableOpacity>
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
        {daysOfWeek.map((day, index) => {
          const stepsForDay = weekSteps[index];
          const fillHeight = Math.min((stepsForDay / MAX_STEPS) * 100, 100); // Limitar la altura al 100%

          return (
            <View key={index} style={styles.dayContainer}>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, 
                  { 
                    height: `${fillHeight}%`,
                    backgroundColor: todayIndex === index ? '#FF7F50' : '#A9A9A9', 
                  }
                ]}>
                  <Text style={styles.stepsText}>{stepsForDay}</Text>
                </View>
              </View>
              <Text style={todayIndex === index ? styles.currentDay : styles.defaultDay}>{day}</Text>
            </View>
          );
        })}
      </View>
      
      {/* Media diaria */}
      <Text style={styles.averageSteps}>
        Media diaria: {(weekSteps.reduce((sum, steps) => sum + steps, 0) / 7).toFixed(0)}
      </Text>
    </View>
  );
};

export default InicioScreen;
