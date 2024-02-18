package com.example.demo.service;

import com.example.demo.dto.StudentDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entity.Student;
import com.example.demo.entity.User;
import com.example.demo.repo.StudentRepository;
import com.example.demo.repo.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<StudentDTO> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .map(student -> modelMapper.map(student, StudentDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public StudentDTO addStudent(StudentDTO studentDTO) {
        Student student = modelMapper.map(studentDTO, Student.class);
        Student savedStudent = studentRepository.save(student);
        return modelMapper.map(savedStudent, StudentDTO.class);
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    @Override
    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isPresent()) {
            Student existingStudent = optionalStudent.get();
            existingStudent.setName(studentDTO.getName());
            existingStudent.setCourse(studentDTO.getCourse());
            Student updatedStudent = studentRepository.save(existingStudent);
            return modelMapper.map(updatedStudent, StudentDTO.class);
        }
        return null; // You may consider throwing an exception if the student with the given id is not found
    }

    @Override
    public UserDTO register(UserDTO userDTO) {
        // Hash the password before saving it to the database
        String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
        userDTO.setPassword(encodedPassword);

        User user = modelMapper.map(userDTO, User.class);
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDTO.class);
    }

    @Override
    public UserDTO login(UserDTO userDTO) {
        // Find the user by username
        Optional<User> optionalUser = userRepository.findByUsername(userDTO.getUsername());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Check if the provided password matches the stored hashed password
            if (passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
                // Passwords match, return the user DTO
                return modelMapper.map(user, UserDTO.class);
            }
        }
        // User not found or incorrect password
        return null;
    }
}
