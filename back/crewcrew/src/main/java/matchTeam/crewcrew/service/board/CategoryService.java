package matchTeam.crewcrew.service.board;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.category.CategoryDTO;
import matchTeam.crewcrew.dto.category.EachCategoryResponseDTO;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.repository.board.CategoryRepository;
import matchTeam.crewcrew.response.exception.category.CategoryNotFoundException;
import matchTeam.crewcrew.response.exception.category.SelectCategoryException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDTO> readAll() {
        List<Category> categories = categoryRepository.findAllOrderByParentIdAscNullsFirstCategoryIdAsc();
        return CategoryDTO.toDtoList(categories);
    }

    public EachCategoryResponseDTO findById(Long id){
        Category category = categoryRepository.findById(id)
                .orElseThrow(CategoryNotFoundException::new);

        if (category.getCategoryParent() == null) {
            throw new SelectCategoryException();
        }
        return EachCategoryResponseDTO.builder().res(category).build();
    }

}
