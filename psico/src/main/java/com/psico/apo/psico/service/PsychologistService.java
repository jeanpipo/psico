package com.psico.apo.psico.service;

import com.psico.apo.psico.model.Psychologist;
import com.psico.apo.psico.model.Review;
import com.psico.apo.psico.repository.PsychologistRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PsychologistService {

    private final PsychologistRepository psychologistRepository;

    public PsychologistService(PsychologistRepository psychologistRepository) {
        this.psychologistRepository = psychologistRepository;
    }

    public List<Psychologist> getAllPsychologists(String pais, String ciudad) {
        return psychologistRepository.findAll(pais, ciudad);
    }

    public Optional<Map<String, Object>> getPsychologistProfile(int id) {
        Optional<Psychologist> psychologistOpt = psychologistRepository.findById(id);
        if (psychologistOpt.isEmpty()) {
            return Optional.empty();
        }

        Psychologist psychologist = psychologistOpt.get();
        List<Review> reviews = psychologistRepository.findReviewsByPsychologistId(id);

        Map<String, Object> profile = new HashMap<>();
        profile.put("psychologist", psychologist);
        profile.put("reviews", reviews);

        return Optional.of(profile);
    }
}

