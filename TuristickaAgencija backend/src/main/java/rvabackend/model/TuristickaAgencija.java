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
public class TuristickaAgencija implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", insertable = false, updatable = false)
	private int id;
	
	private String naziv;
	private String adresa;
	private String kontakt;
	private static final long serialVersionUID = 1L;
	
	@OneToMany(mappedBy = "turistickaAgencija")
	@JsonIgnore
	private List<Aranzman> aranzman;
	
	public TuristickaAgencija() {
		
	}
	
	public TuristickaAgencija(int id, String naziv, String adresa, String kontakt) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.adresa = adresa;
		this.kontakt = kontakt;
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
	
	public String getAdresa() {
		return this.adresa;
	}
	
	public void setAdresa(String adresa) {
		this.adresa = adresa;
	}
	
	public String getKontakt() {
		return this.kontakt;
	}
	
	public void setKontakt(String kontakt) {
		this.kontakt = kontakt;
	}
	
	public List<Aranzman> getAranzman() {
		return this.aranzman;
	}

	public void setAranzman(List<Aranzman> aranzman) {
		this.aranzman = aranzman;
	}
	
}
