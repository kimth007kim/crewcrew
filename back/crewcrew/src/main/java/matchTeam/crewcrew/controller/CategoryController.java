package matchTeam.crewcrew.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.CategoryDTO;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.response.board.BoardSuccessResponse;
import matchTeam.crewcrew.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = "DB에 저장된 카테고리 목록을 불러오는 Controller")
@RequiredArgsConstructor
@RestController
public class CategoryController {
    private final CategoryService categoryService;

    @ApiOperation(value = "전체 카테고리 목록을 리턴하는 메소드")
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/categorylist")
    public BoardSuccessResponse getAllCategories(){
        final List<CategoryDTO> categories = categoryService.getAllCategories();
        return BoardSuccessResponse.success(categories);
    }

    @ApiOperation(value = "자식 카테고리 목록을 리턴하는 메소드")
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/categorylist/{categoryParent}")
    public BoardSuccessResponse getChildCategories(@PathVariable Category categoryParent){
        final List<CategoryDTO> categories = categoryService.getChildCategories(categoryParent);
        return BoardSuccessResponse.success(categories);
    }

}
