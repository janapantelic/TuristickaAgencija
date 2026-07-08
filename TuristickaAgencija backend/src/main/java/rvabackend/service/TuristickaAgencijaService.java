package rvabackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rvabackend.model.TuristickaAgencija;
import rvabackend.repository.TuristickaAgencijaRepository;

@Service
public class TuristickaAgencijaService {
	@Autowired
	private TuristickaAgencijaRepository turistickaAgencijaRepository;
	
	public List<TuristickaAgencija> getAll(){
		return turistickaAgencijaRepository.findAll();
	}
	
	public Optional<TuristickaAgencija> findById(Integer id) {
		return turistickaAgencijaRepository.findById(id);
	}
	
	public List<TuristickaAgencija> findByNazivContainingIgnoreCase(String naziv) {
		return turistickaAgencijaRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	public TuristickaAgencija save(TuristickaAgencija turistickaAgencija) {
		return turistickaAgencijaRepository.save(turistickaAgencija);
	}
	
	public boolean existsById(Integer id) {
		return turistickaAgencijaRepository.existsById(id);
	}
	
	public void deleteById(Integer id) {
		turistickaAgencijaRepository.deleteById(id);
	}
}
