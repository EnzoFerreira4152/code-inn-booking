package com.booking.codeinn.security.controller;

import com.booking.codeinn.exceptions.BadRequestException;
import com.booking.codeinn.security.DTO.JwtDTO;
import com.booking.codeinn.security.DTO.LoginUserDTO;
import com.booking.codeinn.security.DTO.RegisterUserDTO;
import com.booking.codeinn.security.JWT.JwtProvider;
import com.booking.codeinn.security.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private IUserService userService;
    private JwtProvider jwtProvider;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, IUserService userService, JwtProvider jwtProvider){
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping(path = "/register")
    public ResponseEntity<JwtDTO> registerUser(@Valid @RequestBody RegisterUserDTO user) throws BadRequestException {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.addUser(user));
    }

    @PostMapping(path = "/login")
    public ResponseEntity<JwtDTO> loginUser(@RequestBody LoginUserDTO loginUserDTO){
        return ResponseEntity.ok(userService.loginUser(loginUserDTO));
    }

}