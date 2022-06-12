package matchTeam.crewcrew.response.exception;

import lombok.Getter;
import matchTeam.crewcrew.response.ErrorCode;

@Getter
public class CrewException extends RuntimeException {
    ErrorCode errorCode;

    public CrewException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }

}

