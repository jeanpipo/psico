package com.psico.apo.psico.repository;

import com.psico.apo.psico.model.Psychologist;
import com.psico.apo.psico.model.Review;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class PsychologistRepository {

    private final JdbcTemplate jdbcTemplate;

    public PsychologistRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final class PsychologistRowMapper implements RowMapper<Psychologist> {
        @Override
        public Psychologist mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new Psychologist(
                    rs.getInt("id"),
                    rs.getString("nombre"),
                    rs.getString("apellido"),
                    rs.getString("especialidad"),
                    rs.getString("pais"),
                    rs.getString("ciudad"),
                    rs.getString("zona_horaria"),
                    rs.getObject("fecha_creacion", java.time.OffsetDateTime.class),
                    rs.getObject("fecha_actualizacion", java.time.OffsetDateTime.class),
                    rs.getBoolean("eliminado")
            );
        }
    }

    private static final class ReviewRowMapper implements RowMapper<Review> {
        @Override
        public Review mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new Review(
                    rs.getInt("id"),
                    rs.getInt("paciente_id"),
                    rs.getInt("psicologo_id"),
                    rs.getInt("calificacion"),
                    rs.getString("comentario"),
                    rs.getObject("fecha_creacion", java.time.OffsetDateTime.class)
            );
        }
    }

    public List<Psychologist> findAll(String pais, String ciudad) {
        StringBuilder sql = new StringBuilder("SELECT * FROM psicologos WHERE eliminado = false");
        List<Object> params = new java.util.ArrayList<>();

        if (pais != null && !pais.isEmpty()) {
            sql.append(" AND pais = ?");
            params.add(pais);
        }
        if (ciudad != null && !ciudad.isEmpty()) {
            sql.append(" AND ciudad = ?");
            params.add(ciudad);
        }
        return jdbcTemplate.query(sql.toString(), new PsychologistRowMapper(), params.toArray());
    }

    public Optional<Psychologist> findById(int id) {
        String sql = "SELECT * FROM psicologos WHERE id = ? AND eliminado = false";
        return jdbcTemplate.query(sql, new PsychologistRowMapper(), id).stream().findFirst();
    }

    public List<Review> findReviewsByPsychologistId(int psicologoId) {
        String sql = "SELECT * FROM resenas WHERE psicologo_id = ?";
        return jdbcTemplate.query(sql, new ReviewRowMapper(), psicologoId);
    }
}

