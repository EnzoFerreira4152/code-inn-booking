package com.booking.codeinn.dto;

import com.booking.codeinn.entities.*;

import java.util.List;

public class AccommodationDTO {
    private Integer id;
    private String title;
    private String address;
    private Float latitude;
    private Float longitude;
    private String description;
    private Double rating;
    private String rating_text;
    private Integer stars;
    private String cancellation_policy;
    private CategoryDTO category;
    private CityDTO city;
    private List<Image> images;
    private List<Rule> rules;
    private List<Characteristic> characteristics;
    private List<HealthSafety> health_safety;

    public AccommodationDTO() {
    }

    public AccommodationDTO(Integer id, String title, String address, Float latitude, Float longitude, String description, Double rating, String rating_text, Integer stars, String cancellation_policy, CategoryDTO category, CityDTO city, List<Image> images, List<Rule> rules, List<Characteristic> characteristics, List<HealthSafety> health_safety) {
        this.id = id;
        this.title = title;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.rating = rating;
        this.rating_text = rating_text;
        this.stars = stars;
        this.cancellation_policy = cancellation_policy;
        this.category = category;
        this.city = city;
        this.images = images;
        this.rules = rules;
        this.characteristics = characteristics;
        this.health_safety = health_safety;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getRating_text() {
        return rating_text;
    }

    public void setRating_text(String rating_text) {
        this.rating_text = rating_text;
    }

    public Integer getStars() {
        return stars;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }

    public String getCancellation_policy() {
        return cancellation_policy;
    }

    public void setCancellation_policy(String cancellation_policy) {
        this.cancellation_policy = cancellation_policy;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public CityDTO getCity() {
        return city;
    }

    public void setCity(CityDTO city) {
        this.city = city;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public List<Rule> getRules() {
        return rules;
    }

    public void setRules(List<Rule> rules) {
        this.rules = rules;
    }

    public List<Characteristic> getCharacteristics() {
        return characteristics;
    }

    public void setCharacteristics(List<Characteristic> characteristics) {
        this.characteristics = characteristics;
    }

    public List<HealthSafety> getHealth_safety() {
        return health_safety;
    }

    public void setHealth_safety(List<HealthSafety> health_safety) {
        this.health_safety = health_safety;
    }

}
