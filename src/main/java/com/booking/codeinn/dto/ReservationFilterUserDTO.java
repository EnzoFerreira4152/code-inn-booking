package com.booking.codeinn.dto;

import java.time.LocalDate;

public class ReservationFilterUserDTO {
    private Integer id;
    private String arrivalTime;
    private LocalDate startDate;
    private LocalDate finishDate;
    private AccommodationDTO accommodation;

    public ReservationFilterUserDTO() {
    }

    public ReservationFilterUserDTO(Integer id, String arrivalTime, LocalDate startDate, LocalDate finishDate, AccommodationDTO accommodation) {
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.accommodation = accommodation;
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

    public AccommodationDTO getAccommodation() {
        return accommodation;
    }

    public void setAccommodation(AccommodationDTO accommodation) {
        this.accommodation = accommodation;
    }
}
