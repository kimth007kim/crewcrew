package matchTeam.crewcrew.response;

import com.google.gson.Gson;
import net.minidev.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResponseHandler {
    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, Object responseObj) {

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("status", 200);
        map.put("message", message);
        map.put("data", responseObj);
        map.put("error", false);

        return new ResponseEntity<Object>(map, status);

    }

    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, List<Object> responseObj) {
        
        System.out.println("----------------------여기");
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("status", 200);
        map.put("message", message);
        map.put("data", responseObj);
        map.put("error", false);

        return new ResponseEntity<Object>(map, status);

    }

    public static ResponseEntity<Object> ErrorResponse(ErrorCode errorCode) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("status", errorCode.getStatus());
        map.put("success", false);
        map.put("errorMessage", errorCode.getMessage());
        map.put("error", true);

        return  new ResponseEntity<Object>(map,HttpStatus.OK);

    }
}
