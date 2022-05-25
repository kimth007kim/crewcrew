package matchTeam.crewcrew.dto.application;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.application.Application;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Getter
public class ArrivedApplierDetailsDTO {
    @ApiModelProperty(value = "신청서의 id")
    private Long apId;

    @ApiModelProperty(value = "유저의 uid" )
    private Long uid;

    @ApiModelProperty(value = "유저의 닉네임")
    private String nickName;

    @ApiModelProperty(value = "프로필 사진 url")
    private String profileImage;

    @ApiModelProperty(value = "선호하는 카테고리 리스트")
    private List<Long> likedCategoryList;

    @ApiModelProperty(value = "지원서의 한마디")
    private String commentary;

    @ApiModelProperty(value = "지원서의 현재 상태(0: 참여거절, 1: 참여요청중, 2: 참여완료, 3: 참여취소)")
    private Integer progress;

    @DateTimeFormat(pattern = "MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd")
    @ApiModelProperty(value = "신청날짜", notes = "월일", example = "03-28")
    private LocalDateTime createdDate;

    @Builder
    public ArrivedApplierDetailsDTO(User res, Application ap) {
        this.apId = ap.getId();
        this.uid = ap.getUser().getUid();
        this.nickName = res.getNickname();
        this.profileImage = res.getProfileImage();
        this.commentary = ap.getCommentary();
        this.progress = ap.getProgress();
        this.createdDate = ap.getCreatedDate();
    }

    public void setLikedCategoryList(List<Long> likedCategoryList){
        this.likedCategoryList = likedCategoryList;
    }
}
