package pe.edu.vallegrande.AISTUDIO.service;

import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CognitiveService {

    private static final String API_KEY = "AIzaSyC4Qe02m3cTlChhhsgqSWYlQZxok5VTZEI";

    public String generateContent(String question) throws Exception {
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        MediaType mediaType = MediaType.parse("application/json");

        String requestBodyJson = String.format("{\r\n  \"contents\": [\r\n    {\r\n      \"parts\": [\r\n        {\r\n          \"text\": \"%s\"\r\n        }\r\n      ]\r\n    }\r\n  ]\r\n}\r\n", question);
        RequestBody body = RequestBody.create(mediaType, requestBodyJson);

        String url = String.format("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=%s", API_KEY);

        Request request = new Request.Builder()
                .url(url)
                .method("POST", body)
                .addHeader("Content-Type", "application/json")
                .build();

        try (Response response = client.newCall(request).execute()) {
            String responseBody = response.body().string();
            log.info("Respuesta JSON completa: " + responseBody);

            // Convertir la respuesta en JSONObject
            JSONObject jsonObject = new JSONObject(responseBody);

            // Extraer el contenido relevante
            String answer = jsonObject.getJSONArray("candidates")
                    .getJSONObject(0)
                    .getJSONObject("content")
                    .getJSONArray("parts")
                    .getJSONObject(0)
                    .getString("text");

            return answer;
        }
    }

    public String listModels() throws Exception {
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        MediaType mediaType = MediaType.parse("text/plain");

        // La URL debe ser formateada correctamente con la clave API
        String url = String.format("https://generativelanguage.googleapis.com/v1beta/models?key=%s", API_KEY);

        // La solicitud GET no requiere cuerpo
        Request request = new Request.Builder()
                .url(url)
                .method("GET", null)
                .build();

        try (Response response = client.newCall(request).execute()) {
            String responseBody = response.body().string();
            log.info("Respuesta JSON completa de modelos: " + responseBody);

            return responseBody;
        }
    }
}
