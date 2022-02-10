package matchTeam.crewcrew.entity.board;

import lombok.Getter;

import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Getter
public enum BoardApproach {
    APPROACH_OFFLINE(0, "오프라인"),
    APPROACH_ONLINE(1, "온라인");

    private Integer approachCode;
    private String approachName;
    private static final Map<Integer, String> BOARD_APPROACH_MAP = Collections.unmodifiableMap(
            Stream.of(values()).collect(Collectors.toMap(BoardApproach::getApproachCode, BoardApproach::getApproachName))
    );

    BoardApproach(Integer approachCode, String approachName){
        this.approachCode = approachCode;
        this.approachName = approachName;
    }

    public static BoardApproach of(final Integer approachCode){
        return BoardApproach.valueOf(BOARD_APPROACH_MAP.get(approachCode));
    }

}
