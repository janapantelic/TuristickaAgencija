package rvabackend.model;

import java.io.Serializable;
import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Aranzman implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", insertable = false, updatable = false)
	private int id;
	
	private double ukupnaCena;
	private boolean placeno;
	
	
	private Date datumRealizacije; 
	
	@ManyToOne
	@JoinColumn(name = "hotel")
	private Hotel hotel;
	
	@ManyToOne
	@JoinColumn(name = "turistickaAgencija")
	private TuristickaAgencija turistickaAgencija;
	
	private static final long serialVersionUID = 1L;
	
	public Aranzman(int id, double ukupnaCena, boolean placeno, Date datumRealizacije, Hotel hotel,TuristickaAgencija turistickaAgencija) {
		super();
		this.id = id;
		this.ukupnaCena = ukupnaCena;
		this.placeno = placeno;
		this.datumRealizacije = datumRealizacije;
		this.hotel = hotel;
		this.turistickaAgencija = turistickaAgencija;
	}
	
	public Aranzman() {
		
	}
	
	public int getId() {
		return this.id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public double getUkupnaCena() {
		return this.ukupnaCena;
	}
	
	public void setUkupnaCena(double ukupnaCena) {
		this.ukupnaCena = ukupnaCena;
	}
	
	public boolean isPlaceno() {
		return this.placeno;
	}
	
	public void setPlaceno(boolean placeno) {
		this.placeno = placeno;
	}
	
	public Date getDatumRealizacije() {
		return this.datumRealizacije;
	}
	
	public void setDatumRealizacije(Date datumRealizacije) {
		this.datumRealizacije = datumRealizacije;
	}
	
	public Hotel getHotel() {
		return this.hotel;
	}
	
	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}
	
	public TuristickaAgencija getTuristickaAgencija() {
		return this.turistickaAgencija;
	}
	
	public void setTuristickaAgencija(TuristickaAgencija turistickaAgencija) {
		this.turistickaAgencija = turistickaAgencija;
	}
	
}
