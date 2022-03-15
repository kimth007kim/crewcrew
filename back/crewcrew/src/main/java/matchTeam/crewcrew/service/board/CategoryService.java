package matchTeam.crewcrew.service.board;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.category.CategoryResponseDTO;
import matchTeam.crewcrew.dto.category.EachCategoryResponseDTO;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.repository.board.CategoryRepository;
import matchTeam.crewcrew.response.exception.category.NotExistCategoryException;
import matchTeam.crewcrew.response.exception.category.AskNotDetailCategoryException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryResponseDTO> readAll() {
        List<Category> categories = categoryRepository.findAllOrderByParentIdAscNullsFirstCategoryIdAsc();
        return CategoryResponseDTO.toDtoList(categories);
    }

    public EachCategoryResponseDTO findById(Long id){
        Category category = categoryRepository.findById(id)
                .orElseThrow(NotExistCategoryException::new);

        if (category.getCategoryParent() == null) {
            throw new AskNotDetailCategoryException();
        }
        return EachCategoryResponseDTO.builder().res(category).build();
    }

    public List<EachCategoryResponseDTO> readAllbyParent(Long parentId) {
        Category category = categoryRepository.findById(parentId)
                .orElseThrow(NotExistCategoryException::new);
        
        if (category.getCategoryParent() != null){
            throw new NotExistCategoryException();
        }

        List<Category> categories = categoryRepository.findAllByCategoryParentId(parentId);
        return EachCategoryResponseDTO.toDtoList(categories);
    }


}
