package com.booking.codeinn.security.service.Impl;

import com.booking.codeinn.exceptions.BadRequestException;
import com.booking.codeinn.security.DTO.JwtDTO;
import com.booking.codeinn.security.DTO.LoginUserDTO;
import com.booking.codeinn.security.DTO.RegisterUserDTO;
import com.booking.codeinn.security.JWT.JwtProvider;
import com.booking.codeinn.security.enums.RoleName;
import com.booking.codeinn.security.service.interfaces.IRoleService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.booking.codeinn.security.model.User;
import com.booking.codeinn.security.repository.IUserRepository;
import com.booking.codeinn.security.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class UserService implements IUserService, UserDetailsService {

    private IUserRepository iUserRepository;
    private IRoleService iRoleService;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtProvider jwtProvider;
    private ObjectMapper mapper;

    @Autowired
    public UserService (IUserRepository userRepository, IRoleService roleService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtProvider jwtProvider ,ObjectMapper mapper){
        this.iUserRepository = userRepository;
        this.iRoleService = roleService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
        this.mapper = mapper;
    }

    @Override
    public JwtDTO addUser(RegisterUserDTO registerUserDTO) throws BadRequestException {
        if(iUserRepository.existsByEmail(registerUserDTO.getEmail())){
            throw new BadRequestException("Email already exists");
        }else{
            User userToSave = mapper.convertValue(registerUserDTO, User.class);
            userToSave.setRole(iRoleService.findByName(RoleName.ROLE_USER.toString()).get());
            userToSave.setPassword(passwordEncoder.encode(registerUserDTO.getPassword()));

            iUserRepository.save(userToSave);

            LoginUserDTO userToLogin = new LoginUserDTO(registerUserDTO.getEmail(), registerUserDTO.getPassword());
            return loginUser(userToLogin);
        }
    }

    @Override
    public JwtDTO loginUser (LoginUserDTO loginUserDTO) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUserDTO.getEmail(), loginUserDTO.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        User user = (User) authentication.getPrincipal();

        JwtDTO jwtDTO = new JwtDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                jwt,
                user.getEmail(),
                user.getAuthorities()
        );

        return jwtDTO;
    }

    @Override
    public Optional<User> findById(Long id) {
        return iUserRepository.findById(id);
    }

    @Override
    public void deleteUser(Long id){
        iUserRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return iUserRepository.findByEmail(email).get();
    }

}
