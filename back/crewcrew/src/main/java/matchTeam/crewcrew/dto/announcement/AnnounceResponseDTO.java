package matchTeam.crewcrew.dto.announcement;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
public class AnnounceResponseDTO {
    /*
     * 내가 참여요청한 크루 (도희님 지원하기랑 같이 연계     다음주 화요일까지 화면 디자인하기!!!)
     * 글 갯수
     * 참여요청한 날짜
     * 글 제목
     * 글 작성자 닉네임 + 프사
     * 카테고리 > 상세카테고리
     * 모집인원수
     * 참여요청자수
     * 모집진행상태 (진행중 D-1 , 시간상 마감)
     * 요청취소 (버튼)
     */
    private Long announceId;
    private Long boardId;
    private Long leaderId;
    private Long applicantId;
    private Integer announceType;
    private String profileImage;

    @Builder
    public AnnounceResponseDTO(Long boardId, Long leaderId, Long applicantId, Integer announceType, String profileImage) {
        this.boardId = boardId;
        this.leaderId = leaderId;
        this.applicantId = applicantId;
        this.announceType = announceType;
        this.profileImage = profileImage;
    }
}
