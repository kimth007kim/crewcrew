package matchTeam.crewcrew.dto.application;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@NoArgsConstructor
@Getter
public class ArrivedApplicationUserDetailsResponseDTO {
    private List<ApplicationUserDetailsResponseDTO> content;
    private Long theNumberOfWaiting = 0L;

    @Builder
    public ArrivedApplicationUserDetailsResponseDTO(List<ApplicationUserDetailsResponseDTO> content, Long theNumberOfWaiting) {
        this.content = content;
        this.theNumberOfWaiting = theNumberOfWaiting;
    }

    public static ArrivedApplicationUserDetailsResponseDTO toDTO(List<ApplicationUserDetailsResponseDTO> content, Long theNumberOfWaiting){
        return ArrivedApplicationUserDetailsResponseDTO.builder()
                .content(content)
                .theNumberOfWaiting(theNumberOfWaiting).build();
    }
}
