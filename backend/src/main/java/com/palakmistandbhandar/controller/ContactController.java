package com.palakmistandbhandar.controller;

import com.palakmistandbhandar.dto.ContactDTO;
import com.palakmistandbhandar.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ContactDTO> submitMessage(@Valid @RequestBody ContactDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactService.saveMessage(dto));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ContactDTO>> getAllMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }

    @GetMapping("/unread")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ContactDTO>> getUnreadMessages() {
        return ResponseEntity.ok(contactService.getUnreadMessages());
    }

    @PutMapping("/{id}/read")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ContactDTO> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.markAsRead(id));
    }
}
