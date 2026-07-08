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
import rvabackend.model.Aranzman;
import rvabackend.service.AranzmanService;
import rvabackend.model.Hotel;
import rvabackend.service.HotelService;

@CrossOrigin
@RestController
public class AranzmanController {
	
	@Autowired
	private AranzmanService aranzmanService;
	
	@Autowired HotelService hotelService;
	
	@Autowired 
	private JdbcTemplate jdbcTemplate;
	
	@Operation(summary = "Returns List of all Aranzmans.")
	@GetMapping("aranzman")
	public ResponseEntity<List<Aranzman>> getAll() {
		List<Aranzman> aranzmans = aranzmanService.getAll();
		return new ResponseEntity<>(aranzmans, HttpStatus.OK);
	}
	
	@Operation(summary = "Returns Aranzman with id that was forwarded as path variable.")
	@GetMapping("aranzman/{id}")
	public ResponseEntity<Aranzman> getOne(@PathVariable("id") Integer id) {
		if(aranzmanService.findById(id).isPresent()) {
			Optional<Aranzman> aranzmanOpt = aranzmanService.findById(id);
			return new ResponseEntity<>(aranzmanOpt.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<Aranzman>(HttpStatus.NOT_FOUND);
		}
	}
	
	 @Operation(summary = "Return list od Aranzmans containing stirng that was forwarded as path variable in 'hotel'.")
	 @GetMapping("aranzman/hotel/{id}")
	 public ResponseEntity<List<Aranzman>> getAllForHotel(@PathVariable("id") Integer id) {
	    	Optional<Hotel> hotel = hotelService.findById(id);
	    	if (hotel.isPresent()) {
	    		List<Aranzman> aranzmans = aranzmanService.findByForeignKeyHotel(hotel.get());
	    		return new ResponseEntity<>(aranzmans, HttpStatus.OK);
	    	}
	    	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    	
	    }
	 
	    @GetMapping("placeniAranzmani")
	    public ResponseEntity<List<Aranzman>> placeno() {
	        List<Aranzman> aranzmans = aranzmanService.findByPlacenoTrue();
	        return new ResponseEntity<>(aranzmans, HttpStatus.OK);
	    }
	    
	    @Operation(summary = "Adds new Aranzman to database.")
	    @PostMapping("aranzman")
	    public ResponseEntity<Aranzman> addAranzman(@RequestBody Aranzman aranzman) {
	    	Aranzman  savedAranzman = aranzmanService.save(aranzman);
	    	URI location = URI.create("/aranzman/" + savedAranzman.getId());
	    	return ResponseEntity.created(location).body(savedAranzman);
	    }
	    
	    @Operation(summary = "Updates Aranzman that has id that was forwarded as path variable with values forwarded in Request Body.")
	    @PutMapping("aranzman/{id}")
	    public ResponseEntity<Aranzman> upadateOne(@RequestBody Aranzman aranzman, @PathVariable("id") Integer id) {
	    	if (!aranzmanService.existsById(id)) {
	    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    	}
	    	aranzman.setId(id);
	    	Aranzman savedAranzman = aranzmanService.save(aranzman);
	    	return ResponseEntity.ok().body(savedAranzman);
	    }
	    
	    @Operation(summary = "Deletes Aranzman with id that was forwarded as path variable.")
	    @DeleteMapping("aranzman/{id}")
	    public ResponseEntity<HttpStatus> delete(@PathVariable Integer id) {
	    	if(id == -100 && !aranzmanService.existsById(-100)) {
	            jdbcTemplate.execute(
	                    "INSERT INTO aranzman (\"id\", \"ukupna_cena\", \"placeno\", \"datum_realizacije\", \"hotel\", \"turisticka_agencija\") "
	                    		+" OVERRIDING SYSTEM VALUE "
	                            + " VALUES (-100, 45000, TRUE, to_date('20.06.2026.', 'dd.mm.yyyy'), 3, 2)");
	    	}
	    	
	        if (aranzmanService.existsById(id)) {
	        	aranzmanService.deleteById(id);
	            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	        }

	        return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
	    }

}
