package com.eci.cosw.springbootsecureapi.model;

public class Task {

    private int id;
    private String descripcion;
    private String responsableName;
    private String responsableEmail;
    private String dueDate;
    private String status;

    public Task(int id, String descripcion, String responsableName, String responsableEmail, String dueDate, String status) {
        this.id = id;
        this.descripcion = descripcion;
        this.responsableName = responsableName;
        this.responsableEmail = responsableEmail;
        this.dueDate = dueDate;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getResponsableName() {
        return responsableName;
    }

    public void setResponsableName(String responsableName) {
        this.responsableName = responsableName;
    }

    public String getResponsableEmail() {
        return responsableEmail;
    }

    public void setResponsableEmail(String responsableEmail) {
        this.responsableEmail = responsableEmail;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
