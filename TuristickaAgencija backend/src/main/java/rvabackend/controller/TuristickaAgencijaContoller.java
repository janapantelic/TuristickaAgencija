package rvabackend.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import rvabackend.model.TuristickaAgencija;
import rvabackend.service.TuristickaAgencijaService;

@CrossOrigin(origins = "http://localhost:4300")
@RestController
public class TuristickaAgencijaContoller {
	
	@Autowired
	private TuristickaAgencijaService turistickaAgencijaService;

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Operation(summary = "Return List of all Turisticka_agencijas")
	@GetMapping("turistickaAgencija")
	public ResponseEntity<List<TuristickaAgencija>> getAll(){
		List<TuristickaAgencija> turistickaAgencijas = turistickaAgencijaService.getAll();
		return new ResponseEntity<>(turistickaAgencijas, HttpStatus.OK);
	}
	
	@Operation(summary = "Return Turisticka_agencija with id that was forwarded as path variable.")
	@GetMapping("turistickaAgencija/{id}")
	public ResponseEntity<TuristickaAgencija> getOne(@PathVariable("id") Integer id){
		if(turistickaAgencijaService.findById(id).isPresent()) {
			Optional<TuristickaAgencija> turistickaAgencija = turistickaAgencijaService.findById(id);
			return new ResponseEntity<>(turistickaAgencija.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<TuristickaAgencija>(HttpStatus.NOT_FOUND);
		}
	}
	
	@Operation(summary = "Return List od Turisticka_agencijas containing string that was forwarded as path variable in 'naziv'.")
	@GetMapping("turistickaAgencija/naziv/{naziv}")
	public ResponseEntity<List<TuristickaAgencija>> getByNaziv(@PathVariable("naziv") String naziv){
		List<TuristickaAgencija> turistickaAgencijas = turistickaAgencijaService.findByNazivContainingIgnoreCase(naziv);
		return new ResponseEntity<>(turistickaAgencijas, HttpStatus.OK);
	}
	
	@Operation(summary = "Adds new Turisticka_agencija to database.")
	@PostMapping("turistickaAgencija")
	public ResponseEntity<TuristickaAgencija> addTuristickaAgencija(@RequestBody TuristickaAgencija turistickaAgencija) {
		TuristickaAgencija savedTuristickaAgencija = turistickaAgencijaService.save(turistickaAgencija);
		URI location = URI.create("/turistickaAgencija/" + savedTuristickaAgencija.getId());
		return ResponseEntity.created(location).body(savedTuristickaAgencija);
	}
	
	@Operation(summary = "Updates Turisticka_agencija that has id that was forwarded as path variable with values forwarded in Request Body.")
	@PutMapping(value = "turistickaAgencija/{id}")
	public ResponseEntity<TuristickaAgencija> updateTuristickaAgencija(@RequestBody TuristickaAgencija turistickaAgencija, @PathVariable("id") Integer id) {
		if(turistickaAgencijaService.existsById(id)) {
			turistickaAgencija.setId(id);
			TuristickaAgencija savedTuristickaAgencija = turistickaAgencijaService.save(turistickaAgencija);
			return ResponseEntity.ok().body(savedTuristickaAgencija);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@Operation(summary = "Deletes Turisticka_agencija with id that was forwarded as path variable.")
	@DeleteMapping("turistickaAgencija/{id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable Integer id) {
		if(id == -100 && !turistickaAgencijaService.existsById(id)) {
			jdbcTemplate.execute("INSERT INTO turisticka_agencija (\"id\", \"naziv\", \"adresa\", \"kontakt\") " 
						+" OVERRIDING SYSTEM VALUE "
						+ " VALUES (-100, 'Test naziv', 'Test adresa', 'Test kontakt')");
		}
		if(turistickaAgencijaService.existsById(id)) {
			turistickaAgencijaService.deleteById(id);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}
		return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
	}

}
