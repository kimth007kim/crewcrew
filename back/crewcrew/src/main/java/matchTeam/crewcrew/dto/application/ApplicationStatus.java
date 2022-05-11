package matchTeam.crewcrew.dto.application;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Locale;


@NoArgsConstructor
@Getter
public enum ApplicationStatus {
    DECLINED(0), APPLY(1), COMPLETED(2), CANCELED(3);

    private Integer statusCode;

    ApplicationStatus(Integer statusCode) {
        this.statusCode = statusCode;
    }

    @JsonCreator
    public static ApplicationStatus from(String s){
        return ApplicationStatus.valueOf(s.toUpperCase(Locale.ROOT));
    }
}
