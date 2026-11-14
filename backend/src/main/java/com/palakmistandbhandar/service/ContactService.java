package com.palakmistandbhandar.service;

import com.palakmistandbhandar.dto.ContactDTO;
import com.palakmistandbhandar.model.ContactMessage;
import com.palakmistandbhandar.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactDTO saveMessage(ContactDTO dto) {
        ContactMessage msg = ContactMessage.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .subject(dto.getSubject())
                .message(dto.getMessage())
                .read(false)
                .build();
        return toDTO(contactMessageRepository.save(msg));
    }

    public List<ContactDTO> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc()
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ContactDTO> getUnreadMessages() {
        return contactMessageRepository.findByReadFalseOrderByCreatedAtDesc()
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ContactDTO markAsRead(Long id) {
        ContactMessage msg = contactMessageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found with id: " + id));
        msg.setRead(true);
        return toDTO(contactMessageRepository.save(msg));
    }

    private ContactDTO toDTO(ContactMessage m) {
        return ContactDTO.builder()
                .id(m.getId())
                .name(m.getName())
                .email(m.getEmail())
                .phone(m.getPhone())
                .subject(m.getSubject())
                .message(m.getMessage())
                .read(m.getRead())
                .createdAt(m.getCreatedAt().toString())
                .build();
    }
}
