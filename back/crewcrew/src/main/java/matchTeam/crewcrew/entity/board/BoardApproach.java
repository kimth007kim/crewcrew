package matchTeam.crewcrew.entity.board;

import lombok.Getter;

@Getter
public enum BoardApproach {
    오프라인(0),
    온라인(1);

    private final Integer approach;

    BoardApproach(Integer approach){
        this.approach = approach;
    }
}
