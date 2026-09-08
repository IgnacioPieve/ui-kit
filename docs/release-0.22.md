# v0.22.0

- Autoguardado: `flush()` devuelve `false` si falló el último guardado. Los editores deben comprobarlo antes de navegar o mostrar éxito. Un reintento exitoso restablece el resultado.
- El indicador de guardado funciona con el montaje doble de StrictMode.
- Los errores HTTP de validación se presentan como texto, también en descargas.
- El tema funciona aunque el navegador bloquee localStorage; los controles nativos siguen el tema seleccionado.
- Autocompletado con semántica de combobox y cierre al salir del campo.
- Diálogos con altura dinámica, menor padding móvil y botón de cierre de 40 px.
- Mayor contraste de los colores primario y advertencia en modo claro.
- Navegación por teclado al contenido y respeto de movimiento reducido.

Verificación: `npm run typecheck` y `npm test`. Las pruebas cubren concurrencia, errores y reintentos del autoguardado, y respuestas HTTP.
