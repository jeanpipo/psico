package com.psico.apo.psico.controller;

import com.psico.apo.psico.model.Psychologist;
import com.psico.apo.psico.service.PsychologistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/psychologists")
public class PsychologistController {

    private final PsychologistService psychologistService;

    public PsychologistController(PsychologistService psychologistService) {
        this.psychologistService = psychologistService;
    }

    /**
     * Gets all psychologists, with optional filtering by country and city.
     * @param pais Country to filter by.
     * @param ciudad City to filter by.
     * @return A list of psychologists.
     */
    @GetMapping
    public List<Psychologist> getAllPsychologists(
            @RequestParam(required = false) String pais,
            @RequestParam(required = false) String ciudad) {
        return psychologistService.getAllPsychologists(pais, ciudad);
    }

    /**
     * Gets the profile of a psychologist, including their reviews.
     * @param id The ID of the psychologist.
     * @return A response entity containing the psychologist's profile or 404 if not found.
     */
    @GetMapping("/{id}/profile")
    public ResponseEntity<Map<String, Object>> getPsychologistProfile(@PathVariable int id) {
        return psychologistService.getPsychologistProfile(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

