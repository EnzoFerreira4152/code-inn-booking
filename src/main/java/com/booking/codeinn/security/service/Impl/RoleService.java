package com.booking.codeinn.security.service.Impl;

import com.booking.codeinn.security.model.Role;
import com.booking.codeinn.security.repository.IRoleRepository;
import com.booking.codeinn.security.service.interfaces.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class RoleService implements IRoleService{

    @Autowired
    IRoleRepository roleRepository;

    public void createRole(Role role){
        roleRepository.save(role);
    }

    @Override
    public Optional<Role> findByName(String rolName) {
        return roleRepository.findByName(rolName);
    }

    @Override
    public Role addRole(Role role) {
        return null;
    }

    @Override
    public List<Role> listRoles() {
        return null;
    }
}