package com.booking.codeinn.repository;

import com.booking.codeinn.entities.Accommodation;
import com.booking.codeinn.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IAccommodationRepository extends JpaRepository<Accommodation, Integer> {

    @Query(
            value = "SELECT * FROM accommodations a " +
                    "JOIN categories c ON a.category_id = c.id " +
                    "WHERE c.title = ?1",
            nativeQuery = true
    )
    List<Accommodation> findAllByCategoryTitle(String category);

    @Query(
            value = "SELECT * FROM accommodations a " +
                    "JOIN cities c ON a.city_id = c.id " +
                    "WHERE c.name = ?1",
            nativeQuery = true)
    List<Accommodation> findAllByCityName(String city);

    @Query(
            value = "SELECT * FROM accommodations a " +
                    "LEFT JOIN reservations r ON a.id = r.accommodation_id " +
                    "LEFT JOIN cities c ON a.city_id = c.id " +
                    "WHERE c.name = ?1 " +
                    "AND (r.starting_date NOT BETWEEN ?2 AND ?3 OR r.starting_date IS NULL) " +
                    "AND (r.finish_date NOT BETWEEN ?2 AND ?3 OR r.finish_date IS NULL) " +
                    "GROUP BY a.id",
            nativeQuery = true)
    List<Accommodation> filter(String cityName, LocalDate startingDate, LocalDate finishDate);

}
