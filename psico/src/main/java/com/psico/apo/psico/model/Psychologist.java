package com.psico.apo.psico.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Psychologist {
    private Integer id;
    private String nombre;
    private String apellido;
    private String especialidad;
    private String pais;
    private String ciudad;
    private String zonaHoraria;
    private OffsetDateTime fechaCreacion;
    private OffsetDateTime fechaActualizacion;
    private boolean eliminado;
}

