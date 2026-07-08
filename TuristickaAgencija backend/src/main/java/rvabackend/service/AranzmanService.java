package rvabackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rvabackend.model.Hotel;
import rvabackend.model.Aranzman;
import rvabackend.repository.AranzmanRepository;

@Service
public class AranzmanService {
	@Autowired
	private AranzmanRepository aranzmanRepository;
	
	public List<Aranzman> getAll() {
		return aranzmanRepository.findAll();
	}
	
	public List<Aranzman> findByHotel(Hotel hotel) {
		return aranzmanRepository.findByHotel(hotel);
	}
	
	public Optional<Aranzman> findById(Integer id) {
		return aranzmanRepository.findById(id);
	}
	
	public List<Aranzman> findByPlacenoTrue() {
		return aranzmanRepository.findByPlacenoTrue();
	}
	
	public List<Aranzman> findByForeignKeyHotel(Hotel hotel) {
		return aranzmanRepository.findByHotel(hotel);
	}
	
	public Aranzman save(Aranzman aranzman) {
		return aranzmanRepository.save(aranzman);
	}
	
	public boolean existsById(Integer id) {
		return aranzmanRepository.existsById(id);
	}
	
	public void deleteById(Integer id) {
		aranzmanRepository.deleteById(id);
	}

}
