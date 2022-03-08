package matchTeam.crewcrew.dto.board;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@NoArgsConstructor
@Getter
public class PageResponseDTO {

    private List<BoardResponseDTO> contents;
    private Integer pageNum;
    private Integer pageSize;
    private Boolean paged;
    private Boolean unpaged;
    private Long totalElements;
    private Integer totalPages;
    private Boolean last;
    private Integer eachPageElements;
    private Boolean first;
    private Boolean empty;

    @Builder
    public PageResponseDTO(Page<BoardResponseDTO> res){
        this.contents = res.getContent();
        this.pageNum = res.getPageable().getPageNumber();
        this.pageSize = res.getPageable().getPageSize();
        this.paged = res.getPageable().isPaged();
        this.unpaged = res.getPageable().isUnpaged();
        this.totalElements = res.getTotalElements();
        this.totalPages = res.getTotalPages();
        this.last = res.isLast();
        this.eachPageElements = res.getSize();
        this.first = res.isFirst();
        this.empty = res.isEmpty();
    }

    public static PageResponseDTO toDTO(Page<BoardResponseDTO> page){
        return PageResponseDTO.builder()
                .res(page).build();
    }
}
