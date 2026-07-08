package rvabackend.model;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Hotel implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", insertable = false, updatable = false)
	private int id;
	
	private String naziv;
	private int brojZvezdica;
	private String opis;
	
	@ManyToOne 
	@JoinColumn(name = "destinacija")
	private Destinacija destinacija;
	
	private static final long serialVersionUID = 1L;
	
	@OneToMany(mappedBy = "hotel", cascade = {CascadeType.ALL})
	@JsonIgnore
	private List<Aranzman> aranzman;
	
	public Hotel() {
		
	}
	
	public Hotel(int id, String naziv, int brojZvezdica, String opis, Destinacija destinacija) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.brojZvezdica = brojZvezdica;
		this.opis = opis;
		this.destinacija = destinacija;
	}
	
	public int getId() {
		return this.id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getNaziv() {
		return this.naziv;
	}
	
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	
	public int getBrojZvezdica() {
		return this.brojZvezdica;
	}
	
	public void setBrojZvezdica(int brojZvezdica) {
		this.brojZvezdica = brojZvezdica;
	}
	
	public String getOpis() {
		return this.opis;
	}
	
	public void setOpis(String opis) {
		this.opis = opis;
	}
	
	public Destinacija getDestinacija() {
		return this.destinacija;
	}
	
	public void setDestinacija(Destinacija destinacija) {
		this.destinacija = destinacija;
	}
}
