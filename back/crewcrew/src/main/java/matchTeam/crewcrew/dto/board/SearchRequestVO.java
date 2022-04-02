package matchTeam.crewcrew.dto.board;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.awt.print.Pageable;
import java.util.List;

@NoArgsConstructor
@Getter @Setter
public class SearchRequestVO {
    /*
    * uri 패턴 (최신순, 마감임박순, 조회수순) (온라인/오프라인) (카테고리)
    * /board/list?order=recent?approach=0%1category
    * */
    @ApiModelProperty(value = "(온라인/오프라인)", notes = "검색 조건 중에서 온라인(0)인지, 오프라인(1)인지 아니면 전부를 검색할 건지 ")
    private List<Integer> approach;

    @ApiModelProperty(value = "(카테고리 번호 리스트)", notes = "검색하고자 하는 카테고리 번호들")
    private List<Long> category;

    @ApiModelProperty(value = "검색하고자 하는 키워드", notes = "검색하길 원하는 키워드")
    private String keyword;
}
