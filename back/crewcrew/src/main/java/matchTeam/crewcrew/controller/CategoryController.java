package matchTeam.crewcrew.controller;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.CategoryDTO;
import matchTeam.crewcrew.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/boardwrite")
    public ResponseEntity<List<CategoryDTO>> getAllCategories(){
        final List<CategoryDTO> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}
