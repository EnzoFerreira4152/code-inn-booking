package com.booking.codeinn.security.service.interfaces;

import com.booking.codeinn.exceptions.BadRequestException;
import com.booking.codeinn.security.DTO.JwtDTO;
import com.booking.codeinn.security.DTO.LoginUserDTO;
import com.booking.codeinn.security.DTO.RegisterUserDTO;
import com.booking.codeinn.security.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface IUserService extends UserDetailsService {
    JwtDTO addUser(RegisterUserDTO user) throws BadRequestException;
    JwtDTO loginUser(LoginUserDTO loginUserDTO);
    Optional<User> findById(Long id);
    void deleteUser(Long id);
}
