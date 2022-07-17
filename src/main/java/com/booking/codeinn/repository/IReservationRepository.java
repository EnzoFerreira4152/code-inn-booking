package com.booking.codeinn.repository;

import com.booking.codeinn.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IReservationRepository extends JpaRepository<Reservation, Integer> {

    @Query(
            value = "SELECT * FROM reservations r " +
                    "JOIN accommodations a ON r.accommodation_id = a.id " +
                    "JOIN users u ON r.user_id = u.id " +
                    "WHERE r.user_id = ?1",
            nativeQuery = true)
    List<Reservation> findUserReservations(Integer id);

    @Query(
            value = "SELECT * FROM reservations r " +
                    "JOIN accommodations a ON r.accommodation_id = a.id " +
                    "WHERE r.accommodation_id = ?1",
            nativeQuery = true
    )
    List<Reservation> findAllByAccId(Integer id);
}
