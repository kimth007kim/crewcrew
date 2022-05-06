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

@NoArgsConstructor
@Getter
public class ApplicationUserDetailsResponseDTO {
    @ApiModelProperty(value = "Long", notes = "유저의 uid")
    private Long uid;

    @ApiModelProperty(value = "String", notes = "유저의 닉네임")
    private String nickName;

    @ApiModelProperty(value = "String", notes = "프로필 사진 url")
    private String profileImage;

    @ApiModelProperty(value = "String", notes = "지원서의 한마디")
    private String commentary;

    @ApiModelProperty(value = "Integer", notes = "지원서의 현재 상태")
    private Integer progress;

    @DateTimeFormat(pattern = "MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd")
    @ApiModelProperty(value = "작성날짜", notes = "월일", example = "03-28")
    private LocalDateTime createdDate;

    @Builder
    public ApplicationUserDetailsResponseDTO(User res, Application ap) {
        this.uid = ap.getUser().getUid();
        this.nickName = res.getNickname();
        this.profileImage = res.getProfileImage();
        this.commentary = ap.getCommentary();
        this.progress = ap.getProgress();
        this.createdDate = ap.getCreatedDate();
    }
}
