package rvabackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rvabackend.model.Destinacija;
import rvabackend.repository.DestinacijaRepository;

@Service
public class DestinacijaService {
	
	@Autowired
	private DestinacijaRepository destinacijaRepository;
	
	public List<Destinacija> getAll() {
		return destinacijaRepository.findAll();
	}
	
	public Optional<Destinacija> findById(Integer id){
		return destinacijaRepository.findById(id);
	}
	
	public List<Destinacija> findByMestoContainingIgnoreCase(String mesto){
		return destinacijaRepository.findByMestoContainingIgnoreCase(mesto);
	}
	
	public Destinacija save(Destinacija destinacija) {
		return destinacijaRepository.save(destinacija);
	}
	
	public boolean existsById(Integer id) {
		return destinacijaRepository.existsById(id);
	}
	
	public void deleteById(Integer id) {
		destinacijaRepository.deleteById(id);
	}
}
