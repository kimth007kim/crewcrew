package matchTeam.crewcrew.service;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.category.CategoryDTO;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.repository.board.CategoryRepository;
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

}
