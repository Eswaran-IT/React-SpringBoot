package com.example.demo.service;

import com.example.demo.dto.StudentDTO;
import com.example.demo.dto.UserDTO;

import java.util.List;

public interface StudentService {
    List<StudentDTO> getAllStudents();
    StudentDTO addStudent(StudentDTO studentDTO);
    void deleteStudent(Long id);
    StudentDTO updateStudent(Long id, StudentDTO studentDTO);
    UserDTO register(UserDTO userDTO);
    UserDTO login(UserDTO userDTO);
}
