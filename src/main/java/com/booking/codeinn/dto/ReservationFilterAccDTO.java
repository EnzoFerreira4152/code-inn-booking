package com.booking.codeinn.dto;

import java.time.LocalDate;

public class ReservationFilterAccDTO {
    private Integer id;
    private String arrivalTime;
    private LocalDate startDate;
    private LocalDate finishDate;
    private Long userID;

    public ReservationFilterAccDTO() {
    }

    public ReservationFilterAccDTO(Integer id, String arrivalTime, LocalDate startDate, LocalDate finishDate, Long userID) {
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.startDate = startDate;
        this.finishDate = finishDate;
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

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }
}
