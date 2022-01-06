package matchTeam.crewcrew.Response;

import matchTeam.crewcrew.Dto.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {
    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, Object responseObj) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("status", 200);
        map.put("success", true);
        map.put("message", "성공");
        map.put("data", responseObj);
        map.put("error", false);

        return new ResponseEntity<Object>(map, status);

    }

    public static ResponseEntity<Object> ErrorResponse(ErrorCode errorCode) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("status", errorCode.getCode());
        map.put("success", false);
        map.put("errorMessage", errorCode.getMessage());
        map.put("error", true);

        return  new ResponseEntity<Object>(map,HttpStatus.OK);

    }
}
