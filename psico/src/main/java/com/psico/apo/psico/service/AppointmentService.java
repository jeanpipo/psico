package com.psico.apo.psico.service;

import com.psico.apo.psico.dto.CreateAppointmentDTO;
import com.psico.apo.psico.model.Appointment;
import com.psico.apo.psico.repository.AppointmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Transactional
    public Appointment createAppointment(CreateAppointmentDTO dto) {
        Appointment appointment = new Appointment();
        appointment.setPsicologoId(dto.getPsicologoId());
        appointment.setPacienteId(dto.getPacienteId());
        appointment.setFechaHoraInicio(dto.getFechaHoraInicio());
        appointment.setFechaHoraFin(dto.getFechaHoraFin());
        appointment.setEstado("PENDIENTE");
        return appointmentRepository.save(appointment);
    }

    @Transactional
    public boolean cancelAppointment(int id) {
        Optional<Appointment> appointmentOpt = appointmentRepository.findById(id);
        if (appointmentOpt.isEmpty() || "COMPLETADO".equals(appointmentOpt.get().getEstado())) {
            return false;
        }
        return appointmentRepository.updateStatus(id, "CANCELADO") > 0;
    }

    @Transactional
    public boolean confirmAppointment(int id) {
        Optional<Appointment> appointmentOpt = appointmentRepository.findById(id);
        if (appointmentOpt.isEmpty() || !"PENDIENTE".equals(appointmentOpt.get().getEstado())) {
            return false;
        }
        return appointmentRepository.updateStatus(id, "CONFIRMADO") > 0;
    }

    public List<Appointment> getPendingAppointmentsForPsychologist(int psychologistId) {
        return appointmentRepository.findByPsychologistIdAndStatus(psychologistId, "PENDIENTE");
    }
}

