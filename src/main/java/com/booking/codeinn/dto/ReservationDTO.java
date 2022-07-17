package com.booking.codeinn.dto;

import java.time.LocalDate;

public class ReservationDTO {
    private Integer id;
    private String arrivalTime;
    private LocalDate startDate;
    private LocalDate finishDate;
    private AccommodationForReservationDTO accommodation;
    private Long userID;

    public ReservationDTO() {
    }

    public ReservationDTO(Integer id, String arrivalTime, LocalDate startDate, LocalDate finishDate, AccommodationForReservationDTO accommodation, Long userID) {
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.accommodation = accommodation;
        this.userID = userID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public AccommodationForReservationDTO getAccommodation() {
        return accommodation;
    }

    public void setAccommodation(AccommodationForReservationDTO accommodation) {
        this.accommodation = accommodation;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }
}
