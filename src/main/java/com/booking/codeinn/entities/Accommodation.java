package com.booking.codeinn.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "accommodations")
@JsonIgnoreProperties(ignoreUnknown=true)
public class Accommodation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    //---> Categoría
    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference(value = "category-accomodation")
    private Category category;

    //---> Ciudad
    @ManyToOne
    @JoinColumn(name = "city_id")
    @JsonBackReference(value = "city-accommodation")
    private City city;

    //---> Imágenes
    @OneToMany(mappedBy = "accommodation", cascade = {CascadeType.PERSIST ,CascadeType.REMOVE, CascadeType.MERGE}, orphanRemoval = true)
    @JsonManagedReference(value = "accommodation-images")
    private List<Image> images;

    //---> Reglas
    @ManyToMany(cascade = {CascadeType.PERSIST})
    @JoinTable(name = "accommodation_has_rules",
            joinColumns = @JoinColumn(name = "accommodation_accommodation_id"),
            inverseJoinColumns = @JoinColumn(name = "rules_rules_id"))
    private List<Rule> rules;

    //---> Características
    @ManyToMany(cascade = {CascadeType.MERGE})
    @JoinTable(name = "accommodation_has_characteristics",
            joinColumns = @JoinColumn(name = "accommodation_accommodation_id"),
            inverseJoinColumns = @JoinColumn(name = "characteristics_characteristics_id"))
    private List<Characteristic> characteristics;

    //---> Salud y Seguridad
    @ManyToMany(cascade = {CascadeType.PERSIST})
    @JoinTable(name = "accommodation_has_health_safety",
            joinColumns = @JoinColumn(name = "accommodation_accommodation_id"),
            inverseJoinColumns = @JoinColumn(name = "health_safety_health_safety_id"))
    private List<HealthSafety> health_safety;

    //---> Reservaciones
    @OneToMany(mappedBy = "accommodation", cascade = {CascadeType.REMOVE, CascadeType.MERGE})
    @JsonManagedReference(value = "accommodation-reservations")
    private List<Reservation> reservations;

    public Accommodation() {
    }

    public Accommodation(String title, String address, Float latitude, Float longitude, String description, Double rating, String rating_text, Integer stars, String cancellation_policy, Category category, City city, List<Image> images, List<Rule> rules, List<Characteristic> characteristics, List<HealthSafety> health_safety, List<Reservation> reservations) {
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
        this.reservations = reservations;
    }

    public Integer getId() {
        return id;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
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

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}