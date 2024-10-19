package com.stepcounterapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Devuelve el nombre del componente principal registrado desde JavaScript.
   * Este nombre se usa para programar el renderizado del componente.
   */
  override fun getMainComponentName(): String = "StepCounterApp" // Asegúrate de que este nombre coincida con el nombre en tu App.js o index.js

  /**
   * Devuelve la instancia de [ReactActivityDelegate]. Usamos [DefaultReactActivityDelegate],
   * que te permite habilitar la nueva arquitectura con una simple bandera booleana [fabricEnabled].
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
