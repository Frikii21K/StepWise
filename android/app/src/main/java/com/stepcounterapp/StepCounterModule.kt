package com.stepcounterapp
import android.content.ComponentName 

import android.content.Context
import android.content.Intent
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.appwidget.AppWidgetManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class StepCounterModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), SensorEventListener {

    private var sensorManager: SensorManager? = null
    private var stepSensor: Sensor? = null
    private var accelerometer: Sensor? = null
    private var gyroscope: Sensor? = null

    // Variable para almacenar la cantidad de pasos
    companion object {
        private var stepCount = 0
        
        fun getStepCount(): Int {
            return stepCount
        }
    }

    // Variables para el filtro de detección de pasos
    private var lastAccelValues = FloatArray(3) // Valores anteriores del acelerómetro
    private var isMoving = false // Estado de movimiento
    private var isStationary = true // Estado para verificar si está estacionario
    private var stepThreshold = 12.0 // Umbral de aceleración para detectar un paso
    private var stationaryThreshold = 2.0 // Umbral para considerar el teléfono como en reposo
    private var stepDelay = 300 // Tiempo mínimo entre pasos (en ms)
    private var lastStepTime = 0L // Tiempo del último paso registrado

    init {
        // Inicializa los sensores
        sensorManager = reactContext.getSystemService(Context.SENSOR_SERVICE) as SensorManager
        stepSensor = sensorManager?.getDefaultSensor(Sensor.TYPE_STEP_COUNTER)
        accelerometer = sensorManager?.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        gyroscope = sensorManager?.getDefaultSensor(Sensor.TYPE_GYROSCOPE)

        // Registramos los sensores
        stepSensor?.let { sensorManager?.registerListener(this, it, SensorManager.SENSOR_DELAY_UI) }
        accelerometer?.let { sensorManager?.registerListener(this, it, SensorManager.SENSOR_DELAY_UI) }
        gyroscope?.let { sensorManager?.registerListener(this, it, SensorManager.SENSOR_DELAY_UI) }
    }

    override fun getName(): String {
        return "StepCounterModule"
    }

    override fun onSensorChanged(event: SensorEvent?) {
        when (event?.sensor?.type) {
            Sensor.TYPE_STEP_COUNTER -> {
                // Solo se utiliza para enviar conteo de pasos desde el sensor de pasos
                stepCount = event.values[0].toInt()
                sendStepCountToReactNative(stepCount)
                updateWidget(stepCount) // Actualiza el widget
            }
            Sensor.TYPE_ACCELEROMETER -> {
                detectStepsWithAccelerometer(event.values)
            }
            Sensor.TYPE_GYROSCOPE -> {
                lastAccelValues = event.values.clone() // Guardar valores del giroscopio
            }
        }
    }

    private fun detectStepsWithAccelerometer(values: FloatArray) {
        // Calcular la magnitud de la aceleración
        val accelerationMagnitude = Math.sqrt(
            (values[0] * values[0] + values[1] * values[1] + values[2] * values[2]).toDouble()
        )

        val currentTime = System.currentTimeMillis()

        if (accelerationMagnitude > stepThreshold) {
            // Solo cuenta pasos si no está estacionario
            if (!isStationary) {
                if ((currentTime - lastStepTime) > stepDelay) {
                    stepCount++
                    lastStepTime = currentTime
                    sendStepCountToReactNative(stepCount)
                    updateWidget(stepCount) // Actualiza el widget
                }
            } else {
                // Ha comenzado a moverse
                isStationary = false
            }
        } else {
            // Establecer el estado de estacionario si no hay movimiento significativo
            if (accelerationMagnitude < stationaryThreshold) {
                isStationary = true
            }
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        // No se necesita implementar para este caso
    }

    private fun sendStepCountToReactNative(steps: Int) {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("StepCountChanged", steps)
    }

    private fun updateWidget(steps: Int) {
        // Actualiza el widget
        val intent = Intent(reactApplicationContext, StepCounterWidgetProvider::class.java)
        intent.action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
        val appWidgetIds = AppWidgetManager.getInstance(reactApplicationContext).getAppWidgetIds(
            ComponentName(reactApplicationContext, StepCounterWidgetProvider::class.java)
        )
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, appWidgetIds)
        intent.putExtra("steps", steps) // Pasa la cantidad de pasos al widget
        reactApplicationContext.sendBroadcast(intent)
    }
    
    @ReactMethod
    fun startStepCounting() {
        stepSensor?.let { sensorManager?.registerListener(this, it, SensorManager.SENSOR_DELAY_UI) }
        accelerometer?.let { sensorManager?.registerListener(this, it, SensorManager.SENSOR_DELAY_UI) }
        gyroscope?.let { sensorManager?.registerListener(this, it, SensorManager.SENSOR_DELAY_UI) }
    }

    @ReactMethod
    fun stopStepCounting() {
        sensorManager?.unregisterListener(this)
    }
}
