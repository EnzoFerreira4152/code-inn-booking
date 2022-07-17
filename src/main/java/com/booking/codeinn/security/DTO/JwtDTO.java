package com.booking.codeinn.security.DTO;

import org.springframework.security.core.GrantedAuthority;
import java.util.Collection;

public class JwtDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String token;
    private String email;
    private Collection< ? extends GrantedAuthority> authority;
    private String bearer = "Bearer";

    public JwtDTO(Long id, String firstName, String lastName, String token, String email, Collection<? extends GrantedAuthority> authority) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = token;
        this.email = email;
        this.authority = authority;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id){
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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Collection<? extends GrantedAuthority> getAuthority() {
        return authority;
    }

    public void setAuthority(Collection<? extends GrantedAuthority> authority) {
        this.authority = authority;
    }

    public String getBearer() {
        return bearer;
    }
}