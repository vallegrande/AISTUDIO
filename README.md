# AISTUDIO
![image](https://github.com/user-attachments/assets/60846cfd-34ab-4978-80a7-a9f794f811ba)

# Informe sobre el Servicio Cognitivo con AI Studio

Este documento proporciona un manual paso a paso sobre cómo utilizar el servicio cognitivo de AI Studio de Google para generar contenido utilizando la API de Gemini.

## Introducción

En este informe, aprenderás cómo configurar y utilizar la API de Gemini en AI Studio para generar contenido basado en texto. AI Studio es una plataforma poderosa que facilita el uso de modelos de lenguaje avanzados para tareas de generación de contenido.

## Requisitos Previos

- Cuenta de Google
- Acceso a [AI Studio](https://ai.google.dev/aistudio?hl=es-419)
- Postman o una herramienta similar para enviar solicitudes HTTP

## Pasos para Obtener una Clave de API

1. **Accede a AI Studio:**
   - Visita [AI Studio](https://ai.google.dev/aistudio?hl=es-419).
   - Inicia sesión con tu cuenta de Google.

  ![image](https://github.com/user-attachments/assets/3763ece1-af21-47fc-9b0f-707a6a19c858)


2. **Obtén una Clave de API:**
   - Dentro de AI Studio, navega a la sección "Obtén una clave de API de Gemini".

   ![image](https://github.com/user-attachments/assets/90da96ea-5de0-452e-b345-baec2c2e86c9)


3. **Crea una Clave de API:**
   - Selecciona "Crear una clave de API".
   - Elige uno de tus proyectos de Google Cloud con acceso a escritura existente.
   - Haz clic en "Crear clave de API en un proyecto existente".

   ![image](https://github.com/user-attachments/assets/059383aa-2d19-44fc-ba6d-e768234deb25)


4. **Obtén la Clave de API:**
   - Después de crear la clave, se mostrará en la interfaz de AI Studio.
   - Anota la clave proporcionada, ya que la necesitarás para realizar solicitudes a la API.

  ![image](https://github.com/user-attachments/assets/27e98e90-6396-4751-aedb-3558c2b4493e)


## Configuración en Postman

1. **Crea una Solicitud POST en Postman:**
   - Abre Postman y crea una nueva solicitud POST.

   ![image](https://github.com/user-attachments/assets/394e684d-d735-4844-adba-fa26c245caff)


2. **Configura la URL y los Headers:**
   - En la URL, ingresa el siguiente endpoint, reemplazando `YOUR_API_KEY` con la clave de API que obtuviste:

     ```
     https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY
     ```

   - En la pestaña de "Headers", añade el siguiente header:
     - `Content-Type: application/json`

   ![image](https://github.com/user-attachments/assets/e4a61d84-4c81-4536-9648-daf7e5827fcf)


3. **Configura el Body de la Solicitud:**
   - En la pestaña "Body", selecciona "raw" y elige el tipo "JSON".
   - Ingresa el siguiente JSON en el cuerpo de la solicitud, reemplazando el texto con la pregunta que deseas realizar:

     ```json
     {
       "contents": [
         {
           "parts": [
             {
               "text": "Explain how AI works"
             }
           ]
         }
       ]
     }
     ```

  ![image](https://github.com/user-attachments/assets/07409d49-7ad5-459b-b17b-8a0daa7b7bbc)


4. **Envía la Solicitud:**
   - Haz clic en "Send" para enviar la solicitud.
   - La respuesta se mostrará en el panel de respuesta de Postman.

   ![image](https://github.com/user-attachments/assets/fca5be98-d945-49cd-a240-8bbda650fe14)


## Agradecimientos

Gracias por utilizar este manual.
