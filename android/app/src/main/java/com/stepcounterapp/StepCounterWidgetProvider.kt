package com.stepcounterapp

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews

class StepCounterWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    private fun updateAppWidget(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int) {
        val views = RemoteViews(context.packageName, R.layout.widget_step_counter)

        // Aquí puedes obtener la cantidad de pasos y la actualización de la barra
        val stepCount = StepCounterModule.getStepCount() // Lógica para obtener pasos
        views.setTextViewText(R.id.step_count_text, stepCount.toString())
        views.setProgressBar(R.id.progress_bar, 6000, stepCount, false)

        // Actualiza el widget
        appWidgetManager.updateAppWidget(appWidgetId, views)
    }

    override fun onEnabled(context: Context) {
        super.onEnabled(context)
        // Se llama cuando el primer widget es creado
    }

    override fun onDisabled(context: Context) {
        super.onDisabled(context)
        // Se llama cuando el último widget es eliminado
    }
}
