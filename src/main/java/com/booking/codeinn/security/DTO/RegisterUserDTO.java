package com.booking.codeinn.security.DTO;

import javax.validation.constraints.*;

public class RegisterUserDTO {
    private Long id;

    @NotEmpty(message = "name must not be empty.")
    private String firstName;

    @NotEmpty(message = "surname must not be empty.")
    private String lastName;

    @NotEmpty(message = "email must not be empty.")
    @Email(message = "email must be in the correct format.")
    private String email;

    @Size(min = 6, message = "password should have at least 6 characters.")
    private String password;

    public RegisterUserDTO() {
    }

    public RegisterUserDTO(Long id, String firstName, String lastName, String email, String password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}