# Calculadora Clara para Android

Esta carpeta contiene la aplicación Android offline. La interfaz y los cálculos se cargan desde un archivo incluido dentro del APK; no necesita conexión a Internet ni permisos de red.

## APK descargable

1. Abre la pestaña **Actions** del repositorio.
2. Entra en la ejecución más reciente de **Crear APK Android**.
3. En **Artifacts**, pulsa **Calculadora-Clara-APK-debug** para descargar el ZIP.
4. Descomprime el ZIP y abre `app-debug.apk` en el móvil Android.

GitHub conserva el artefacto durante 90 días. Para instalarlo, Android puede pedir que permitas la instalación de aplicaciones desde el navegador o gestor de archivos que uses.

## Compilación local

Requiere JDK 17, Android SDK 35 y Gradle 8.9. Desde esta carpeta:

```sh
gradle assembleDebug
```

El APK se genera en `app/build/outputs/apk/debug/app-debug.apk`.
