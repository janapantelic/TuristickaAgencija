package rvabackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rvabackend.model.TuristickaAgencija;

public interface TuristickaAgencijaRepository extends JpaRepository<TuristickaAgencija, Integer> {
	
	List<TuristickaAgencija>findByNazivContainingIgnoreCase(String naziv);

}
