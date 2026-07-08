package rvabackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rvabackend.model.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Integer> {
	
	List<Hotel> findByNazivContainingIgnoreCase(String naziv);

}
