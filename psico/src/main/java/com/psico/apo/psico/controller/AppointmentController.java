package com.psico.apo.psico.controller;

import com.psico.apo.psico.dto.CreateAppointmentDTO;
import com.psico.apo.psico.model.Appointment;
import com.psico.apo.psico.service.AppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    /**
     * Creates a new appointment.
     * @param createAppointmentDTO DTO with appointment details.
     * @return The created appointment.
     */
    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody CreateAppointmentDTO createAppointmentDTO) {
        Appointment newAppointment = appointmentService.createAppointment(createAppointmentDTO);
        return new ResponseEntity<>(newAppointment, HttpStatus.CREATED);
    }

    /**
     * Cancels an appointment.
     * @param id The ID of the appointment to cancel.
     * @return A response entity indicating success or failure.
     */
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelAppointment(@PathVariable int id) {
        return appointmentService.cancelAppointment(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    /**
     * Confirms an appointment.
     * @param id The ID of the appointment to confirm.
     * @return A response entity indicating success or failure.
     */
    @PutMapping("/{id}/confirm")
    public ResponseEntity<Void> confirmAppointment(@PathVariable int id) {
        return appointmentService.confirmAppointment(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.badRequest().build();
    }
}

