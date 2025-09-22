package com.psico.apo.psico.repository;

import com.psico.apo.psico.model.Appointment;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class AppointmentRepository {

    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<Appointment> appointmentRowMapper = new RowMapper<>() {
        @Override
        public Appointment mapRow(ResultSet rs, int rowNum) throws SQLException {
            Appointment appointment = new Appointment();
            appointment.setId(rs.getInt("id"));
            appointment.setPsicologoId(rs.getInt("psicologo_id"));
            appointment.setPacienteId(rs.getInt("paciente_id"));
           // appointment.setFechaHoraInicio(rs.getTimestamp("fecha_hora_inicio").toLocalDateTime());
           // appointment.setFechaHoraFin(rs.getTimestamp("fecha_hora_fin").toLocalDateTime());
            appointment.setEstado(rs.getString("estado"));
            return appointment;
        }
    };

    public Appointment save(Appointment appointment) {
        String sql = """
            INSERT INTO appointment (psicologo_id, paciente_id, fecha_hora_inicio, fecha_hora_fin, estado)
            VALUES (?, ?, ?, ?, ?)
            RETURNING id
        """;
        Integer id = jdbcTemplate.queryForObject(
            sql,
            new Object[]{
                appointment.getPsicologoId(),
                appointment.getPacienteId(),
             //   Timestamp.valueOf(appointment.getFechaHoraInicio()),
              //  Timestamp.valueOf(appointment.getFechaHoraFin()),
                appointment.getEstado()
            },
            Integer.class
        );
        appointment.setId(id);
        return appointment;
    }

    public Optional<Appointment> findById(int id) {
        String sql = "SELECT * FROM appointment WHERE id = ?";
        List<Appointment> result = jdbcTemplate.query(sql, appointmentRowMapper, id);
        return result.stream().findFirst();
    }

    public int updateStatus(int id, String status) {
        String sql = "UPDATE appointment SET estado = ? WHERE id = ?";
        return jdbcTemplate.update(sql, status, id);
    }

    public List<Appointment> findByPsychologistIdAndStatus(int psychologistId, String status) {
        String sql = """
            SELECT * FROM appointment
            WHERE psicologo_id = ? AND estado = ?
            ORDER BY fecha_hora_inicio ASC
        """;
        return jdbcTemplate.query(sql, appointmentRowMapper, psychologistId, status);
    }

    // Puedes agregar otros métodos según sea necesario, siguiendo el mismo patrón.
}

