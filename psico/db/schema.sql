-- This script is designed for PostgreSQL.

-- Drop tables if they exist to start from a clean state.
DROP TABLE IF EXISTS reseñas, psicologos_favoritos, turnos, consulta, usuario_paciente, usuario_psicologo, psicologo, paciente CASCADE;

-- Table to store patient information.
CREATE TABLE paciente (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    fecha_nacimiento DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table to store psychologist (doctor) information.
CREATE TABLE psicologo (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    especialidad VARCHAR(100),
    pais VARCHAR(100),
    ciudad VARCHAR(100),
    perfil_profesional TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- User management table for patients.
CREATE TABLE usuario_paciente (
    id SERIAL PRIMARY KEY,
    paciente_id INT UNIQUE NOT NULL REFERENCES paciente(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- User management table for psychologists.
CREATE TABLE usuario_psicologo (
    id SERIAL PRIMARY KEY,
    psicologo_id INT UNIQUE NOT NULL REFERENCES psicologo(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table for appointments (turnos).
CREATE TABLE turnos (
    id SERIAL PRIMARY KEY,
    paciente_id INT NOT NULL REFERENCES paciente(id) ON DELETE CASCADE,
    psicologo_id INT NOT NULL REFERENCES psicologo(id) ON DELETE CASCADE,
    fecha_hora_inicio TIMESTAMPTZ NOT NULL,
    fecha_hora_fin TIMESTAMPTZ NOT NULL,
    estado VARCHAR(50) NOT NULL CHECK (estado IN ('solicitado', 'confirmado', 'cancelado', 'completado')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table for consultation notes made by the psychologist.
CREATE TABLE consulta (
    id SERIAL PRIMARY KEY,
    turno_id INT UNIQUE NOT NULL REFERENCES turnos(id) ON DELETE CASCADE,
    notas_psicologo TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table for patients to save their favorite psychologists.
CREATE TABLE psicologos_favoritos (
    paciente_id INT NOT NULL REFERENCES paciente(id) ON DELETE CASCADE,
    psicologo_id INT NOT NULL REFERENCES psicologo(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (paciente_id, psicologo_id)
);

-- Table for reviews and ratings given by patients to psychologists.
CREATE TABLE reseñas (
    id SERIAL PRIMARY KEY,
    paciente_id INT NOT NULL REFERENCES paciente(id) ON DELETE CASCADE,
    psicologo_id INT NOT NULL REFERENCES psicologo(id) ON DELETE CASCADE,
    turno_id INT NOT NULL REFERENCES turnos(id) ON DELETE CASCADE,
    calificacion INT NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (paciente_id, psicologo_id, turno_id)
);

