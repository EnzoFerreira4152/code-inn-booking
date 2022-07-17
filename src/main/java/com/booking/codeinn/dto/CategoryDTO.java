package com.booking.codeinn.dto;

public class CategoryDTO {
    private Integer id;
    private String title;
    private String imgUrl;
    private String description;
    private Integer totalAccommodations;

    public CategoryDTO() {
    }

    public CategoryDTO(Integer id, String title, String imgUrl, String description, Integer totalAccommodations) {
        this.id = id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.description = description;
        this.totalAccommodations = totalAccommodations;
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

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getTotalAccommodations() {
        return totalAccommodations;
    }

    public void setTotalAccommodations(Integer totalAccommodations) {
        this.totalAccommodations = totalAccommodations;
    }
}
