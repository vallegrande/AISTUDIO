package pe.edu.vallegrande.AISTUDIO.service;

import lombok.extern.slf4j.Slf4j;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.json.JSONObject;

@Slf4j
public class ConsolaService {

    private static final String API_KEY = "AIzaSyC4Qe02m3cTlChhhsgqSWYlQZxok5VTZEI";
    private static final String PREGUNTA = "Que es un servicio cognitivo?"; // Tu pregunta aquí

    public static void main(String[] args) throws Exception {
        contentEjemplo();
    }

    public static JSONObject contentEjemplo() throws Exception {
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        MediaType mediaType = MediaType.parse("application/json");

        String requestBodyJson = String.format("{\r\n  \"contents\": [\r\n    {\r\n      \"parts\": [\r\n        {\r\n          \"text\": \"%s\"\r\n        }\r\n      ]\r\n    }\r\n  ]\r\n}\r\n", PREGUNTA);
        RequestBody body = RequestBody.create(mediaType, requestBodyJson);

        String url = String.format("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=%s", API_KEY);

        Request request = new Request.Builder()
                .url(url)
                .method("POST", body)
                .addHeader("Content-Type", "application/json")
                .build();

        Response response = client.newCall(request).execute();
        String responseBody = response.body().string();

        // Imprimir el JSON completo
        log.info("Respuesta JSON completa: " + responseBody);

        // Convertir la respuesta en JSONObject
        JSONObject jsonObject = new JSONObject(responseBody);

        return jsonObject;
    }

}
