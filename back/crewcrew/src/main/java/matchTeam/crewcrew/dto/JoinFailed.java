package matchTeam.crewcrew.dto;

import lombok.Data;

@Data
public class JoinFailed {
    private String code;


    public JoinFailed() {
        this.code = "already exist!";
    }
}
