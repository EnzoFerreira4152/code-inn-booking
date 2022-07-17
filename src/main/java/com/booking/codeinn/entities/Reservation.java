package com.booking.codeinn.entities;

import com.booking.codeinn.security.model.User;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "arrival_time")
    private String arrivalTime;
    @Column(name = "starting_date")
    private LocalDate startDate;
    @Column(name = "finish_date")
    private LocalDate finishDate;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "accommodation_id")
    @JsonBackReference(value = "accommodation-reservations")
    private Accommodation accommodation;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User user;

    public Reservation() {
    }

    public Reservation(String arrivalTime, LocalDate startDate, LocalDate finishDate, Accommodation accommodation, User user) {
        this.arrivalTime = arrivalTime;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.accommodation = accommodation;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(LocalDate finishDate) {
        this.finishDate = finishDate;
    }

    public Accommodation getAccommodation() {
        return accommodation;
    }

    public void setAccommodation(Accommodation accommodation) {
        this.accommodation = accommodation;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
