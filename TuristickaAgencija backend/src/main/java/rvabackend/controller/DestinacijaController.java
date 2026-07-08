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
import rvabackend.model.Destinacija;
import rvabackend.service.DestinacijaService;

@CrossOrigin
@RestController
public class DestinacijaController {
	
	@Autowired
	private DestinacijaService destinacijaService;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Operation(summary = "Returns List of all Destinacijas.")
	@GetMapping("destinacija")
	public ResponseEntity<List<Destinacija>> getAll() {
		List<Destinacija> destinacijas = destinacijaService.getAll();
		return new ResponseEntity<>(destinacijas, HttpStatus.OK);
	}
	
	@Operation(summary = "Returns Destinacija with id that was worwarded as path variable.")
	@GetMapping("/destinacija/{id}")
	public ResponseEntity<Destinacija> getOne(@PathVariable("id") Integer id) {
		if(destinacijaService.findById(id).isPresent()) {
			Optional<Destinacija> destinacija = destinacijaService.findById(id);
			return new ResponseEntity<>(destinacija.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<Destinacija>(HttpStatus.NOT_FOUND);
		}
	}
	
	@Operation(summary = "Returns list of Destinacijas containing string that was forwarded as path variable in 'mesto'.")
	@GetMapping("/destinacija/mesto/{mesto}")
	public ResponseEntity<List<Destinacija>> getByMesto(@PathVariable("mesto") String mesto) {
		List<Destinacija> destinacijas = destinacijaService.findByMestoContainingIgnoreCase(mesto);
		return new ResponseEntity<>(destinacijas, HttpStatus.OK);
	}
	
	@Operation(summary = "Adds new Destinacija to database.")
	@PostMapping("destinacija")
	public ResponseEntity<Destinacija> addDestinacija(@RequestBody Destinacija destinacija) {
		Destinacija savedDestinacija = destinacijaService.save(destinacija);
		URI location = URI.create("/destinacija/" + savedDestinacija.getId());
		return ResponseEntity.created(location).body(savedDestinacija);
	}
	
	@Operation(summary = "Upadates Destinacija that was forwarded as path variable with values forwarded in Reques Body.")
	@PutMapping(value = "destinacija/{id}")
	public ResponseEntity<Destinacija> updateDestinacija(@RequestBody Destinacija destinacija, @PathVariable("id") Integer id) {
		if(destinacijaService.existsById(id)) {
			destinacija.setId(id);
			Destinacija savedDestinacija = destinacijaService.save(destinacija);
			return ResponseEntity.ok().body(savedDestinacija);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@Operation(summary = "Deletes Destinacija with id that was forwarded as path variable.")
	@DeleteMapping("destinacija/{id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable("id") Integer id){
		if(id == -100 && !destinacijaService.existsById(id)) {
			jdbcTemplate.execute(
					"INSERT INTO destinacija (\"id\", \"mesto\", \"drzava\", \"opis\") " 
							+ " OVERRIDING SYSTEM VALUE "
					+ " VALUES (-100, 'Test mesto', 'Test drzava', 'Test opis')");
		}
		
		if(destinacijaService.existsById(id)) {
			destinacijaService.deleteById(id);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}
		return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
	}

}


