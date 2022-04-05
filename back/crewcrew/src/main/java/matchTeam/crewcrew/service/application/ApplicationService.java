package matchTeam.crewcrew.service.application;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.application.*;
import matchTeam.crewcrew.entity.application.Application;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.application.ApplicationQueryRepository;
import matchTeam.crewcrew.repository.application.ApplicationRepository;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.repository.board.CategoryRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.application.*;
import matchTeam.crewcrew.response.exception.board.NotExistBoardInIdException;
import matchTeam.crewcrew.response.exception.category.NotExistCategoryException;
import matchTeam.crewcrew.util.customException.UserNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final ApplicationQueryRepository queryRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public ApplicationSaveResponseDTO save(ApplicationSaveRequestDTO req){
        User user = userRepository.findById(req.getUid()).orElseThrow(NotExistUidToApplyException::new);
        Board board = boardRepository.findById(req.getBoardId()).orElseThrow(NotExistBoardIdToApplyException::new);

        checkDuplicateApplier(req);
        checkExpired(board);
        checkUserWriter(user, board);

        Application application = applicationRepository.save(
                req.toEntity(req, user, board)
        );
        return ApplicationSaveResponseDTO.builder()
                .res(application).build();
    }

    @Transactional(readOnly = true)
    public ApplicationCountResponseDTO findMyApplication(Long myUid){

        userRepository.findById(myUid).orElseThrow(NotExistUidToApplyException::new);
        return queryRepository.getMyApplication(myUid);
    }

    @Transactional(readOnly = true)
    public Page<ApplicationDetailResponseDTO> findMyApplicationDetails(ApplicationDetailSpecs detailSpecs, Pageable pageable){
        userRepository.findById(detailSpecs.getUid()).orElseThrow(NotExistUidToApplyException::new);
        validCategoryParentId(detailSpecs.getCategoryParentId());
        return queryRepository.getMyApplicationDetails(detailSpecs, pageable);
    }

    //중복 지원했을때
    public void checkDuplicateApplier(ApplicationSaveRequestDTO req){
        System.out.println("queryRepository.checkDuplicateApply(req) = " + queryRepository.checkDuplicateApply(req));
        if (queryRepository.checkDuplicateApply(req) >= 1L){
            throw new DuplicateApplierException();
        }
    }

    //만료된 게시판에 지원했을때
    public void checkExpired(Board board){
        if ( !board.getViewable()){
            throw new ApplyToExpiredBoardException();
        }
    }

    //게시글 작성자가 지원했을 때
    public void checkUserWriter(User applier, Board board){
        if (applier.getUid().equals(board.getUser().getUid())){
            throw new ApplyToBoardWriterException();
        }
    }

    public void validCategoryParentId(Long parentId){
        try {
            Long findId = categoryRepository.findById(parentId).orElseThrow(NotExistCategoryException::new)
                    .getCategoryParent().getId();
            throw new NotCategoryParentIdException();
        }catch (NullPointerException e){
            return;
        }
    }
}
