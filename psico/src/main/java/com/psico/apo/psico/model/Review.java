package com.psico.apo.psico.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    private Integer id;
    private Integer pacienteId;
    private Integer psicologoId;
    private int calificacion;
    private String comentario;
    private OffsetDateTime fechaCreacion;
}

