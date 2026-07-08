package rvabackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rvabackend.model.Aranzman;
import rvabackend.model.Hotel;

public interface AranzmanRepository extends JpaRepository<Aranzman, Integer>{
	
	List<Aranzman> findByHotel(Hotel hotel);
	List<Aranzman> findByPlacenoTrue();
}