package matchTeam.crewcrew.dto.application;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Getter
public class ArrivedApplicationUserDetailsResponseDTO {
    private List<ArrivedApplierDetailsDTO> content;
    private Long theNumberOfWaiting = 0L;

    @Builder
    public ArrivedApplicationUserDetailsResponseDTO(List<ArrivedApplierDetailsDTO> content, Long theNumberOfWaiting, List<Long> likedCategoryList) {
        this.content = content;
        this.theNumberOfWaiting = theNumberOfWaiting;
    }

    public static ArrivedApplicationUserDetailsResponseDTO toDTO(List<ArrivedApplierDetailsDTO> content, Long theNumberOfWaiting){
        return ArrivedApplicationUserDetailsResponseDTO.builder()
                .content(content)
                .theNumberOfWaiting(theNumberOfWaiting).build();
    }
}
