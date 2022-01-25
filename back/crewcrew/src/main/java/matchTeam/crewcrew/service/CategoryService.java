package matchTeam.crewcrew.service;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.CategoryDTO;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.repository.board.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDTO> getAllCategories(){
        //final List<Category> result = categoryRepository.findAllBy();
        final List<Category> result = categoryRepository.findAllByCategoryParentIsNull();
        return result.stream().map(CategoryDTO::new).collect(Collectors.toList());
    }

    /*public List<CategoryDTO> getChildrenCategories(Long categoryParent){

    }*/
/*

    public BoardDTO getBoard(Long boardSeq){
        Optional<Board> findId = boardRepository.findById(boardSeq);

        Board findPost = findId.orElseThrow(() -> new BoardNotFound("해당 게시물이 존재하지 않습니다."));

        return  BoardDTO.builder()
                .title(findPost.getTitle())
                .boardContent(findPost.getBoardContent())
                .recruitedCrew(findPost.getRecruitedCrew())
                .totalCrew(findPost.getTotalCrew())
                .url(findPost.getUrl())
                .build();
    }
*/

}
