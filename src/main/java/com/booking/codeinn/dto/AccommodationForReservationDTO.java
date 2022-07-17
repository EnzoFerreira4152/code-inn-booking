package com.booking.codeinn.dto;

public class AccommodationForReservationDTO {
    private Integer id;
    private String title;
    private String category;
    private String city;

    public AccommodationForReservationDTO() {
    }

    public AccommodationForReservationDTO(Integer id, String title, String category, String city) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.city = city;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
