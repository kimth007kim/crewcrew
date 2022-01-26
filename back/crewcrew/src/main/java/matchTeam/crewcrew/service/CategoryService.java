package matchTeam.crewcrew.service;

import lombok.RequiredArgsConstructor;
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
        System.out.println("CategoryService.getAllCategories");
        return result.stream().map(CategoryDTO::new).collect(Collectors.toList());
    }

}
