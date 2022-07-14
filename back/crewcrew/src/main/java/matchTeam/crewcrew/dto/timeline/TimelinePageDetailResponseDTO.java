package matchTeam.crewcrew.dto.timeline;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.announcement.Announcement;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class TimelinePageDetailResponseDTO {

    @ApiModelProperty(value = "타임라인 id", notes = "타임라인 식별용 id", example = "123")
    private Long announcementId;

    @ApiModelProperty(value = "카테고리명", notes = "카테고리 이름", example = "요리")
    private String categoryName;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @ApiModelProperty(value = "타임라인 생성 날짜", notes = "년원일 시간 분", example = "2022-02-16 09:30")
    private LocalDateTime createdDate;

    @ApiModelProperty(value = "알림 타입", notes = "1 - 나에게 온 참여요청, 0 - 나의 참여요청 거절, 2 - 나의 참여요청 수락, 3 - 나의 참여 취소 ", example = "1")
    private Integer announceType;

    @ApiModelProperty(value = "게시물 제목", notes = "게시글 제목 작성", example = "함께 크루원 모집하실 분 구합니다")
    private String boardTitle;

    @ApiModelProperty(value = "읽음 여부", notes = "초깃값은 false", example = "false")
    private Boolean readChk;

    private String boardLink;

    private String nickname;

    @QueryProjection
    @Builder
    public TimelinePageDetailResponseDTO(Announcement res) {
        this.announcementId = res.getAnnounceId();
        this.categoryName = res.getBoard().getCategory().getCategoryName();
        this.createdDate = res.getCreatedDate();
        this.announceType = res.getAnnounceType();
        this.boardTitle = res.getBoard().getTitle();
        this.boardLink = "https://crewcrew.org/board/" + res.getBoard().getId();
        this.nickname = res.getApplicant().getNickname();
        this.readChk = res.getReadChk();
    }

    public static TimelinePageDetailResponseDTO toDTO(Announcement announcement){
        return TimelinePageDetailResponseDTO.builder()
                .res(announcement).build();
    }
}
