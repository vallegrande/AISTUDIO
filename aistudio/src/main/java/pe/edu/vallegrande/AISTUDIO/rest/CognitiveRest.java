package pe.edu.vallegrande.AISTUDIO.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.vallegrande.AISTUDIO.service.CognitiveService;

@RestController
@RequestMapping("/gemini")
public class CognitiveRest {

    @Autowired
    private CognitiveService cognitiveService;

    @PostMapping("/pregunta")
    public String askQuestion(@RequestBody QuestionRequest request) {
        try {
            return cognitiveService.generateContent(request.getPregunta());
        } catch (Exception e) {
            e.printStackTrace();
            return "Error procesando la solicitud";
        }
    }

    @GetMapping("/modelos")
    public String listModels() {
        try {
            return cognitiveService.listModels();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al listar los modelos";
        }
    }
}
