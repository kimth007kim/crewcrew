package matchTeam.crewcrew.dto.board;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@NoArgsConstructor
@Getter
public class BoardPageResponseDTO {

    @ApiModelProperty(value = "조회 결과 존재 여부", dataType = "boolean", example = "true")
    private Boolean hasContent;

    @ApiModelProperty(value = "조회 결과", dataType = "List<BoardResponseDTO>")
    private List<BoardResponseDTO> contents;

    @ApiModelProperty(value = "페이징이 되어있는지에 대한 여부", dataType = "boolean")
    private Boolean paged;

    @ApiModelProperty(value = "페이징이 안 되어있는지에 대한 여부", dataType = "boolean")
    private Boolean unpaged;

    @ApiModelProperty(value = "첫번째페이지인가?", dataType = "boolean")
    private Boolean first;

    @ApiModelProperty(value = "마지막페이지인가?", dataType = "boolean")
    private Boolean last;

    @ApiModelProperty(value = "전체 데이터 수", dataType = "Long")
    private Long totalElements;

    @ApiModelProperty(value = "페이지 당 몇개의 데이터가 조회되는지", dataType = "Integer")
    private Integer eachPageElements;

    @ApiModelProperty(value = "전체 페이지 수", dataType = "Integer")
    private Integer totalPages;

    @ApiModelProperty(value = "현재 페이지 숫자", notes = "게시글 저장에 성공한 유저의 uid", example = "1")
    private Integer nowPageNum;

    @ApiModelProperty(value = "이전페이지 존재 여부", dataType = "boolean")
    private Boolean previousPageable;

    @ApiModelProperty(value = "다음페이지 존재 여부", dataType = "boolean")
    private Boolean nextPageable;

    @ApiModelProperty(value = "조회된 데이터가 없는가?", dataType = "empty")
    private Boolean empty;

    @Builder
    public BoardPageResponseDTO(Page<BoardResponseDTO> res){
        this.contents = res.getContent();
        this.paged = res.getPageable().isPaged();
        this.unpaged = res.getPageable().isUnpaged();
        this.totalElements = res.getTotalElements();
        this.totalPages = res.getTotalPages();
        this.eachPageElements = res.getSize();
        this.last = res.isLast();
        this.first = res.isFirst();
        this.empty = res.isEmpty();
        this.nowPageNum = res.getNumber();
        this.nextPageable = res.hasNext();
        this.previousPageable = res.hasPrevious();
        this.hasContent = res.hasContent();
    }

    public static BoardPageResponseDTO toDTO(Page<BoardResponseDTO> page){
        return BoardPageResponseDTO.builder()
                .res(page).build();
    }
}
