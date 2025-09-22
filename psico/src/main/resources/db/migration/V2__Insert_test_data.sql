
-- Insertar Pacientes
INSERT INTO pacientes (nombre, apellido, fecha_nacimiento, pais, ciudad, zona_horaria) VALUES
                                                                                           ('Ana', 'García', '1990-05-15', 'Argentina', 'Buenos Aires', 'America/Argentina/Buenos_Aires'),
                                                                                           ('Carlos', 'Rodriguez', '1985-11-20', 'Mexico', 'Mexico City', 'America/Mexico_City'),
                                                                                           ('Lucia', 'Martinez', '1992-02-10', 'Spain', 'Madrid', 'Europe/Madrid');

-- Insertar Psicólogos
INSERT INTO psicologos (nombre, apellido, especialidad, pais, ciudad, zona_horaria) VALUES
                                                                                        ('Juan', 'Perez', 'Terapia Cognitivo-Conductual', 'Argentina', 'Buenos Aires', 'America/Argentina/Buenos_Aires'),
                                                                                        ('Maria', 'Lopez', 'Psicoanálisis', 'Mexico', 'Mexico City', 'America/Mexico_City'),
                                                                                        ('Elena', 'Gomez', 'Terapia de Pareja', 'Spain', 'Madrid', 'Europe/Madrid'),
                                                                                        ('Pedro', 'Sanchez', 'Terapia Cognitivo-Conductual', 'Argentina', 'Cordoba', 'America/Argentina/Buenos_Aires');

-- Insertar Usuarios de Pacientes
INSERT INTO usuario_paciente (paciente_id, email, password_hash) VALUES
                                                                     (1, 'ana.garcia@email.com', 'hash_paciente1'),
                                                                     (2, 'carlos.rodriguez@email.com', 'hash_paciente2'),
                                                                     (3, 'lucia.martinez@email.com', 'hash_paciente3');

-- Insertar Usuarios de Psicólogos
INSERT INTO usuario_psicologo (psicologo_id, email, password_hash) VALUES
                                                                       (1, 'juan.perez@email.com', 'hash_psicologo1'),
                                                                       (2, 'maria.lopez@email.com', 'hash_psicologo2'),
                                                                       (3, 'elena.gomez@email.com', 'hash_psicologo3'),
                                                                       (4, 'pedro.sanchez@email.com', 'hash_psicologo4');

-- Insertar Turnos
-- Turno pendiente
INSERT INTO turnos (psicologo_id, paciente_id, fecha_hora_inicio, fecha_hora_fin, estado) VALUES
    (1, 1, NOW() + INTERVAL '3 day', NOW() + INTERVAL '3 day' + INTERVAL '1 hour', 'PENDIENTE');
-- Turno confirmado
INSERT INTO turnos (psicologo_id, paciente_id, fecha_hora_inicio, fecha_hora_fin, estado) VALUES
    (2, 1, NOW() + INTERVAL '5 day', NOW() + INTERVAL '5 day' + INTERVAL '1 hour', 'CONFIRMADO');
-- Turno completado
INSERT INTO turnos (psicologo_id, paciente_id, fecha_hora_inicio, fecha_hora_fin, estado) VALUES
    (1, 2, NOW() - INTERVAL '10 day', NOW() - INTERVAL '10 day' + INTERVAL '1 hour', 'COMPLETADO');
-- Turno cancelado
INSERT INTO turnos (psicologo_id, paciente_id, fecha_hora_inicio, fecha_hora_fin, estado) VALUES
    (3, 3, NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day' + INTERVAL '1 hour', 'CANCELADO');
-- Otro turno pendiente para el psicologo 1
INSERT INTO turnos (psicologo_id, paciente_id, fecha_hora_inicio, fecha_hora_fin, estado) VALUES
    (1, 3, NOW() + INTERVAL '4 day', NOW() + INTERVAL '4 day' + INTERVAL '1 hour', 'PENDIENTE');


-- Insertar Consultas (notas) para turnos completados
INSERT INTO consultas (turno_id, notas) VALUES
    (3, 'El paciente muestra avances significativos en la gestión de la ansiedad. Se recomienda continuar con las técnicas de mindfulness.');

-- Insertar Reseñas
INSERT INTO resenas (paciente_id, psicologo_id, calificacion, comentario) VALUES
                                                                              (2, 1, 5, 'Juan es un excelente profesional. Me ha ayudado mucho.'),
                                                                              (1, 2, 4, 'Maria es muy atenta y comprensiva.');

-- Insertar Psicólogos Favoritos
INSERT INTO psicologos_favoritos (paciente_id, psicologo_id) VALUES
                                                                 (1, 1),
                                                                 (1, 2),
                                                                 (3, 1);

