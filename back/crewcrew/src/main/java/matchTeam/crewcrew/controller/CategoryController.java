package matchTeam.crewcrew.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.category.CategoryDTO;
import matchTeam.crewcrew.response.board.BoardResponse;
import matchTeam.crewcrew.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "Category Controller", tags = "category")
@RequiredArgsConstructor
@RestController
public class CategoryController {
    private final CategoryService categoryService;

    @ApiOperation(value = "전체 카테고리 목록을 리턴하는 메소드")
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/categorylist")
    public BoardResponse getAllCategories(){
        return BoardResponse.success(categoryService.readAll());
    }

}
