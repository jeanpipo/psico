package com.psico.apo.psico.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    private Integer id;
    private Integer psicologoId;
    private Integer pacienteId;
    private OffsetDateTime fechaHoraInicio;
    private OffsetDateTime fechaHoraFin;
    private String estado;
    private OffsetDateTime fechaCreacion;
    private OffsetDateTime fechaActualizacion;
}

