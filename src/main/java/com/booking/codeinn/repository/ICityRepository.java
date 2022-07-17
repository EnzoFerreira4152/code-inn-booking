package com.booking.codeinn.repository;

import com.booking.codeinn.entities.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICityRepository extends JpaRepository<City, Integer> {
    Optional<City> findByName(String name);
}
