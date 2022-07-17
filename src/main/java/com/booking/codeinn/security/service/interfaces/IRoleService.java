package com.booking.codeinn.security.service.interfaces;

import com.booking.codeinn.security.model.Role;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public interface IRoleService {
    void createRole(Role role);
    Optional<Role> findByName(String roleName);
    Role addRole(Role role);
    List<Role> listRoles();
}

