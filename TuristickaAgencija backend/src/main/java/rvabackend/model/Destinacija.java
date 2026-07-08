package rvabackend.model;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Destinacija implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", insertable = false, updatable = false)
	private int id;
	
	private String mesto; 
	private String drzava;
	private String opis;
	private static final long serialVersionUID = 1L;
	
	@OneToMany(mappedBy = "destinacija")
	@JsonIgnore 
	private List<Hotel> hotel;
	
	public Destinacija() {
		
	}
	
	public Destinacija(int id, String mesto, String drzava, String opis) {
		this.id = id;
		this.mesto = mesto;
		this.drzava = drzava;
		this.opis = opis;
	}
	
	public int getId() {
		return this.id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getMesto() {
		return this.mesto;
	}
	
	public void setMesto(String mesto) {
		this.mesto = mesto;
	}
	
	public String getDrzava() {
		return this.drzava;
	}
	
	public void setDrzava(String drzava) {
		this.drzava = drzava;
	}
	
	public String getOpis() {
		return this.opis;
	}
	
	public void setOpis(String opis) {
		this.opis = opis;
	}
	
	public List<Hotel> getHotel() {
		return this.hotel;
	}

	public void setHotel(List<Hotel> hotel) {
		this.hotel = hotel;
	}
}
