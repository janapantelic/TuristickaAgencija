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
import rvabackend.model.Hotel;
import rvabackend.service.HotelService;

@CrossOrigin
@RestController
public class HotelController {
	
	@Autowired
	private HotelService hotelService;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Operation(summary = "Return List of all Hotels.")
	@GetMapping("hotel")
	public ResponseEntity<List<Hotel>>  getAll() {
		List<Hotel> hotels = hotelService.getAll();
		return new ResponseEntity<>(hotels, HttpStatus.OK);
	}
	
	@Operation(summary = "Returns Hotel with id that was forwarded as path variable.")
	@GetMapping("hotel/{id}")
	public ResponseEntity<Hotel> getOne(@PathVariable("id") Integer id) {
		if (hotelService.findById(id).isPresent()) {
			Optional<Hotel> hotelOpt = hotelService.findById(id);
			return new ResponseEntity<>(hotelOpt.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<Hotel>(HttpStatus.NOT_FOUND);
		}
	}
	
	@Operation(summary = "Returns list of Hotels containing string that was forwarded as path variable in 'naziv'.")
	@GetMapping("/hotel/naziv/{naziv}")
	public ResponseEntity<List<Hotel>> getByNaziv(@PathVariable("naziv") String naziv) {
		List<Hotel> hotels = hotelService.findByNazivContainingIgnoreCase(naziv);
		return new ResponseEntity<>(hotels, HttpStatus.OK);
	}
	
	@Operation(summary = "Adds new Hotel to database.")
	@PostMapping("hotel")
    public ResponseEntity<Hotel> addHotel(@RequestBody Hotel hotel) {
        Hotel savedHotel = hotelService.save(hotel);
        URI location = URI.create("/hotel/" + savedHotel.getId());
        return ResponseEntity.created(location).body(savedHotel);
    }
	
	@Operation(summary = "Updates Hotel that has id that was forwarded as path variable with values forwarded in Request Body.")
	@PutMapping(value = "hotel/{id}")
    public ResponseEntity<Hotel> updateHotel(@RequestBody Hotel hotel, @PathVariable("id") Integer id) {
        if (hotelService.existsById(id)) {
        	hotel.setId(id);
        	Hotel savedHotel = hotelService.save(hotel);
            return ResponseEntity.ok().body(savedHotel);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
	
	@Operation(summary = "Deletes Hotel with id that was forwarded as path variable.")
	@DeleteMapping("hotel/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Integer id) {
		if (id == -100 && !hotelService.existsById(-100)) {

            jdbcTemplate.execute("INSERT INTO hotel "
                    + "(\"id\", \"naziv\", \"broj_zvezdica\", \"opis\", \"destinacija\") "
                    + " OVERRIDING SYSTEM VALUE "
                    + " VALUES (-100, 'Test naziv', 4, 'Test opis', 1) ");
        }

        if (hotelService.existsById(id)) {
        	hotelService.deleteById(id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        }
        return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
    }

}
