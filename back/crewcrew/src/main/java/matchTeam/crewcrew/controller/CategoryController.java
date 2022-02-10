package matchTeam.crewcrew.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Object> getAllCategories(){

        return ResponseHandler.generateResponse("카테고리 조회 성공", HttpStatus.OK, categoryService.readAll());
    }

}
