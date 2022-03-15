package matchTeam.crewcrew.controller.api.v1.board;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.category.CategoryResponseDTO;
import matchTeam.crewcrew.dto.category.EachCategoryResponseDTO;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.service.board.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "Category Controller", tags = "4. category")
@RequiredArgsConstructor
@RestController
public class CategoryController {
    private final CategoryService categoryService;

    @ApiOperation(value = "전체 카테고리 목록을 리턴하는 메소드", notes = "전체 카테고리 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "전체 카테고리 조회 성공",
                    response = CategoryResponseDTO.class
            )
    })
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/category/list")
    public ResponseEntity<Object> getAllCategories(){

        return ResponseHandler.generateResponse("전체 카테고리 조회 성공", HttpStatus.OK, categoryService.readAll());
    }

    @ApiOperation(value = "카테고리 번호로 카테고리 관련 내용을 리턴하는 메소드", notes = "부모 카테고리 번호로 자식 카테고리 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "부모 카테고리 별 개별 카테고리 조회 성공",
                    response = EachCategoryResponseDTO.class
            ),
            @ApiResponse(
                    code = 2001,
                    message = "존재하지 않는 카테고리 번호입니다."
            )
    })
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/category/list/{categoryParentId}")
    public ResponseEntity<Object> getChildCategory(@ApiParam(value = "상세 카테고리 id", required = true) @PathVariable Long categoryParentId){

        List<EachCategoryResponseDTO> readAllbyParent = categoryService.readAllbyParent(categoryParentId);
        return ResponseHandler.generateResponse("부모 카테고리 별 개별 카테고리 조회 성공", HttpStatus.OK, readAllbyParent);


//        EachCategoryResponseDTO result = categoryService.findById(categoryId);
//        return ResponseHandler.generateResponse("개별 카테고리 조회 성공", HttpStatus.OK, result);

    }

    @ApiOperation(value = "카테고리 번호로 카테고리 관련 내용을 리턴하는 메소드", notes = "상세 카테고리 번호로 카테고리 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "개별 카테고리 조회 성공",
                    response = EachCategoryResponseDTO.class
            ),
            @ApiResponse(
                    code = 2001,
                    message = "존재하지 않는 카테고리 번호입니다."
            ),
            @ApiResponse(
                    code = 2002,
                    message = "부모 카테고리에 대해 조회했습니다."
            )
    })
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Object> getEachCategory(@ApiParam(value = "상세 카테고리 id", required = true) @PathVariable Long categoryId){

        EachCategoryResponseDTO result = categoryService.findById(categoryId);
        return ResponseHandler.generateResponse("개별 카테고리 조회 성공", HttpStatus.OK, result);

    }

}
