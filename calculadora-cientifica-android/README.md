# calculadoraprendizaje para Android

Esta carpeta contiene la aplicación Android offline. La pantalla de la app reproduce el archivo HTML de la calculadora suministrado por el usuario. La interfaz y los cálculos están incluidos dentro del APK; no necesita conexión a Internet ni permisos de red.

## Descargar e instalar

1. Abre la pestaña **Actions** del repositorio.
2. Entra en la ejecución más reciente de **Crear APK Android**.
3. Descarga el artefacto **calculadoraprendizaje-apk** y descomprímelo.
4. Abre `calculadoraprendizaje.apk` en el móvil Android.

GitHub conserva cada artefacto durante 90 días. En la primera instalación, Android puede pedir permiso para instalar aplicaciones desde la aplicación que hayas usado para abrir el archivo.

## Compilación local

Requiere JDK 17, Android SDK 35 y Gradle 8.9. Desde esta carpeta:

```sh
gradle assembleDebug
```

El APK inicial se genera en `app/build/outputs/apk/debug/app-debug.apk`.
