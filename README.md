# Conecta Con AI

[![TypeScript version][ts-badge]][typescript-5-7]
[![Node.js version][nodejs-badge]][nodejs]
[![APLv2][license-badge]][license]

🚀 Proyecto de demostración para explorar y conectar con diferentes capacidades de OpenAI.

## 📖 Artículo Relacionado

Para una explicación detallada del proyecto, consulta el artículo en Medium:
[Conecta Con AI - Una Guía Completa](https://medium.com/@felipemantillagomez/conecta-con-ai-4e7d002ae9cf)

## 🏃 Cómo Empezar

Este proyecto requiere la última versión LTS de [Node.js][nodejs].

### Clonar repositorio

```sh
git clone https://github.com/enruana/conecta-con-ai
cd conecta-con-ai
npm install
```

### Configuración

Crea un archivo `.env` en la raíz del proyecto con tu clave API de OpenAI:

```
OPENAI_API_KEY=tu-clave-api
```

## 🛠️ Scripts Disponibles

- `clean` - elimina archivos de cobertura, caché y transpilados
- `prebuild` - realiza lint de archivos fuente y pruebas antes de compilar
- `build` - transpila TypeScript a ES6
- `build:watch` - modo interactivo para transpilar automáticamente
- `lint` - verifica archivos fuente y pruebas
- `prettier` - reformatea archivos
- `test` - ejecuta pruebas
- `test:watch` - modo interactivo para volver a ejecutar pruebas automáticamente
- `start` - compila y ejecuta la aplicación interactiva

## 🤖 Funcionalidades AI

Este proyecto incluye un ejecutor interactivo para probar varias capacidades de AI:

1. **Generación de Texto** - Prueba capacidades de generación de texto con GPT-4o
2. **Visión** - Análisis de imágenes desde URLs
3. **Visión con Imagen Local** - Análisis de imágenes locales
4. **Generación de Imágenes** - Generación de imágenes con DALL-E
5. **Edición de Imágenes** - Edición de imágenes existentes
6. **Variación de Imágenes** - Generación de variaciones de imágenes
7. **Audio** - Procesamiento de audio con gpt-4o-audio-preview
8. **Audio Entrada/Salida** - Procesamiento de audio de entrada/salida
9. **Texto a Voz** - Conversión de texto a voz
10. **Voz a Texto** - Conversión de voz a texto
11. **Embeddings** - Generación y comparación de vectores de embedding
12. **Salidas Estructuradas** - Obtención de respuestas estructuradas usando Zod
13. **Function Calling** - Implementación de llamadas a funciones (ej. envío de emails)

Para ejecutar las pruebas, usa:

```sh
npm start
```

Esto lanzará un prompt interactivo donde puedes seleccionar qué funcionalidad de AI probar.

## 🌿 Ramas del Proyecto

El proyecto está organizado en diferentes ramas que implementan funcionalidades específicas:

- **feature/audio**: Procesamiento de audio
- **feature/embeddings**: Trabajo con embeddings para análisis semántico
- **feature/function-calling**: Implementación de function calling (envío de emails)
- **feature/images**: Generación y manipulación de imágenes
- **feature/more-embeddings**: Extensión de funcionalidades de embeddings
- **feature/structured-outputs**: Obtención de respuestas estructuradas
- **feature/tts-stt**: Conversión de texto a voz y viceversa
- **main**: Rama principal que integra todas las funcionalidades

## 📚 Dependencias Principales

- [OpenAI API](https://github.com/openai/openai-node) - Para conectar con los modelos de OpenAI
- [Inquirer](https://github.com/SBoudrias/Inquirer.js) - Para la interfaz interactiva
- [Zod](https://github.com/colinhacks/zod) - Para validación de esquemas
- [Nodemailer](https://nodemailer.com/) - Para funcionalidades de email

## 📝 Licencia

Licenciado bajo APLv2. Consulta el archivo [LICENSE](LICENSE) para más detalles.

[ts-badge]: https://img.shields.io/badge/TypeScript-5.7-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js-22-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v22.x/docs/api/
[typescript]: https://www.typescriptlang.org/
[typescript-5-7]: https://devblogs.microsoft.com/typescript/announcing-typescript-5-7/
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[license]: https://github.com/jsynowiec/node-typescript-boilerplate/blob/main/LICENSE