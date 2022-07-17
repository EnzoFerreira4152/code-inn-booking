package com.booking.codeinn.repository;

import com.booking.codeinn.entities.Characteristic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICharacteristicRepository extends JpaRepository<Characteristic, Integer>{
}
