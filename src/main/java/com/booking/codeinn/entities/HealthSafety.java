package com.booking.codeinn.entities;

import javax.persistence.*;

@Entity
@Table(name = "health_safety")
public class HealthSafety {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;

    public HealthSafety() {
    }

    public HealthSafety(String title) {
        this.title = title;
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
}
