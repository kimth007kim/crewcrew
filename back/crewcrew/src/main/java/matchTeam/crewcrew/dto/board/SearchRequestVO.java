package matchTeam.crewcrew.dto.board;

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
    private List<Integer> approach;
    private List<Long> category;
    private String keyword;
}
