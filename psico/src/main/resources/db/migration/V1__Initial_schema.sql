-- Tabla de Pacientes
CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    pais VARCHAR(100),
    ciudad VARCHAR(100),
    zona_horaria VARCHAR(50) NOT NULL,
    fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    eliminado BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tabla de Psicólogos
CREATE TABLE psicologos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    especialidad VARCHAR(255),
    pais VARCHAR(100),
    ciudad VARCHAR(100),
    zona_horaria VARCHAR(50) NOT NULL,
    fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    eliminado BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tabla de Usuarios para Pacientes
CREATE TABLE usuario_paciente (
    id SERIAL PRIMARY KEY,
    paciente_id INT UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

-- Tabla de Usuarios para Psicólogos
CREATE TABLE usuario_psicologo (
    id SERIAL PRIMARY KEY,
    psicologo_id INT UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (psicologo_id) REFERENCES psicologos(id) ON DELETE CASCADE
);

-- Enum para el estado del turno
CREATE TYPE estado_turno AS ENUM ('PENDIENTE', 'CONFIRMADO', 'CANCELADO', 'COMPLETADO');

-- Tabla de Turnos
CREATE TABLE turnos (
    id SERIAL PRIMARY KEY,
    psicologo_id INT NOT NULL,
    paciente_id INT NOT NULL,
    fecha_hora_inicio TIMESTAMPTZ NOT NULL,
    fecha_hora_fin TIMESTAMPTZ NOT NULL,
    estado estado_turno NOT NULL DEFAULT 'PENDIENTE',
    fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (psicologo_id) REFERENCES psicologos(id),
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

-- Tabla de Consultas (notas del psicólogo)
CREATE TABLE consultas (
    id SERIAL PRIMARY KEY,
    turno_id INT UNIQUE NOT NULL,
    notas TEXT,
    fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (turno_id) REFERENCES turnos(id)
);

-- Tabla de Reseñas
CREATE TABLE resenas (
    id SERIAL PRIMARY KEY,
    paciente_id INT NOT NULL,
    psicologo_id INT NOT NULL,
    calificacion INT NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    FOREIGN KEY (psicologo_id) REFERENCES psicologos(id),
    UNIQUE(paciente_id, psicologo_id) -- Un paciente solo puede dejar una reseña por psicólogo
);

-- Tabla de Psicólogos Favoritos
CREATE TABLE psicologos_favoritos (
    paciente_id INT NOT NULL,
    psicologo_id INT NOT NULL,
    fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (paciente_id, psicologo_id),
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    FOREIGN KEY (psicologo_id) REFERENCES psicologos(id)
);

-- Índices para mejorar el rendimiento de las consultas
CREATE INDEX idx_turnos_psicologo_estado ON turnos(psicologo_id, estado);
CREATE INDEX idx_turnos_paciente_fecha ON turnos(paciente_id, fecha_hora_inicio);
CREATE INDEX idx_psicologos_pais_ciudad ON psicologos(pais, ciudad);

