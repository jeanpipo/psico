package com.psico.apo.psico.dto;

import lombok.Data;
import java.time.OffsetDateTime;

@Data
public class CreateAppointmentDTO {
    private Integer psicologoId;
    private Integer pacienteId;
    private OffsetDateTime fechaHoraInicio;
    private OffsetDateTime fechaHoraFin;
}

