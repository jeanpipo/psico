package com.psico.apo.psico.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Consultation {
    private Integer id;
    private Integer turnoId;
    private String notas;
    private OffsetDateTime fechaCreacion;
    private OffsetDateTime fechaActualizacion;
}

