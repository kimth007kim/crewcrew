package matchTeam.crewcrew.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED) //생성자를 통한 생성 방지
@Builder
public class BoardDTO {
    @NotBlank
    private String title;

    @NotBlank
    private String boardContent;

    @NotBlank
    private Integer recruitedCrew;

    @NotBlank
    private Integer totalCrew;

    //@NotBlank
    private String url;
}
