package matchTeam.crewcrew.service.application;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.application.*;
import matchTeam.crewcrew.dto.board.BoardResponseDTO;
import matchTeam.crewcrew.entity.application.Application;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.application.ApplicationQueryRepository;
import matchTeam.crewcrew.repository.application.ApplicationRepository;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.repository.board.CategoryRepository;
import matchTeam.crewcrew.repository.user.LikedCategoryRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.application.*;
import matchTeam.crewcrew.response.exception.board.NotExistBoardInIdException;
import matchTeam.crewcrew.response.exception.board.NotMatchUidException;
import matchTeam.crewcrew.response.exception.category.NotExistCategoryException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final ApplicationQueryRepository queryRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final LikedCategoryRepository likedCategoryRepository;

    @Transactional
    public ApplicationSaveResponseDTO save(User req, ApplicationSaveRequestDTO info){

        Board board = boardRepository.findById(info.getBoardId()).orElseThrow(NotExistBoardIdToApplyException::new);

        checkDuplicateApplier(req, info);
        checkExpired(board);
        checkUserWriter(req, board);

        Application application = applicationRepository.save(
                info.toEntity(info, board, req)
        );
        return ApplicationSaveResponseDTO.builder()
                .res(application).build();
    }

    @Transactional(readOnly = true)
    public ApplicationCountResponseDTO findMyApplication(User req){

        userRepository.findById(req.getUid()).orElseThrow(NotExistUidToApplyException::new);
        return queryRepository.getMyApplication(req);
    }

    @Transactional(readOnly = true)
    public Page<ApplicationDetailResponseDTO> findMyApplicationDetails(User req, Long categoryParentId, Pageable pageable){
        userRepository.findById(req.getUid()).orElseThrow(NotExistUidToApplyException::new);
        validCategoryParentId(categoryParentId);
        return queryRepository.getMyApplicationDetails(req, categoryParentId, pageable);
    }

    @Transactional(readOnly = true)
    public ApplicationCountResponseDTO findArrivedApplication(User req){

        userRepository.findById(req.getUid()).orElseThrow(NotExistUidToApplyException::new);
        return queryRepository.getArrivedApplication(req.getUid());
    }

    @Transactional(readOnly = true)
    public Page<ApplicationDetailResponseDTO> findArrivedApplicationDetails(User req, Long categoryParentId, Pageable pageable){
        userRepository.findById(req.getUid()).orElseThrow(NotExistUidToApplyException::new);
        validCategoryParentId(categoryParentId);
        return queryRepository.getArrivedApplicationDetails(req, categoryParentId, pageable);
    }

    @Transactional(readOnly = true)
    public ArrivedApplicationUserDetailsResponseDTO findArrivedApplicationApplier(User req, Long boardId){
        User user = userRepository.findById(req.getUid()).orElseThrow(NotExistUidToApplyException::new);
        Board board = boardRepository.findById(boardId).orElseThrow(NotExistBoardInIdException::new);

        if (! user.getUid().equals(board.getUser().getUid())){
            throw new NotMatchBoardOwnerException();
        }

        List<ArrivedApplierDetailsDTO> arrivedApplier = queryRepository.getArrivedApplier(req, boardId);
        for (ArrivedApplierDetailsDTO res: arrivedApplier) {
            res.setLikedCategoryList(likedCategoryRepository.findByUser(userRepository.findByUid(res.getUid())));
        }

        return ArrivedApplicationUserDetailsResponseDTO.toDTO(arrivedApplier, queryRepository.getTheNumberOfWaiting(req, boardId));
    }

    @Transactional
    public ApplicationUserDetailsResponseDTO updateApply(UpdateApplyRequestDTO reqInfo, User reqUser){
        Application ap = applicationRepository.findById(reqInfo.getApId())
                .orElseThrow(NotExistApIdException::new);

        ap.updateProgress(reqInfo.getStatusCode());
        return ApplicationUserDetailsResponseDTO.builder().ap(ap).res(reqUser).build();
    }

    @Transactional(readOnly = true)
    public ApplicationMyCrewResponseDTO findMyCrewCount(User req){
        return ApplicationMyCrewResponseDTO.builder().myCrewCount(queryRepository.getMyCrewCount(req)).build();
    }

    @Transactional(readOnly = true)
    public Page<BoardResponseDTO> findMyCrewCountDetails(User req, Pageable pageable){
        return queryRepository.getMyCrewCountDetails(req, pageable);
    }

    @Transactional
    public void extendExpiredDate(Long boardId){
        Board board = boardRepository.findById(boardId).orElseThrow(NotExistBoardInIdException::new);
        board.extendExpired();
    }

    @Transactional(readOnly = true)
    public ApplicationParticipatedCrewResponseDTO findMyParticipatedCount(User req){
        return ApplicationParticipatedCrewResponseDTO.builder().participatedCount(queryRepository.getParticipatedCrewCount(req)).build();
    }

    @Transactional(readOnly = true)
    public Page<ApplicationParticipatedDetailResponseDTO> findMyParticipatedDetails(User req, Pageable pageable){
        return queryRepository.getMyParticipatedDetails(req,pageable);
    }

    @Transactional(readOnly = true)
    public List<ArrivedApplierDetailsDTO> findAnotherApplier(User req, Long boardId){
        return queryRepository.getAnotherApplier(req, boardId);
    }

    @Transactional(readOnly = true)
    public ApplicationCountResponseDTO findRecruitingCount(User req){
        return queryRepository.getMyRecruitingCount(req);
    }

    @Transactional(readOnly = true)
    public Page<MyRecruitingBoardResponseDTO> findRecruitingDetails(User req, Long categoryParentId, Pageable pageable){
        validCategoryParentId(categoryParentId);
        return queryRepository.getRecruitingDetails(req, categoryParentId, pageable);
    }

    @Transactional(readOnly = true)
    public MyWaitingCrewResponseDTO findWaitingCrew(User req, Long boardId, Integer statusCode){

        Long crewCount = queryRepository.getWaitingCrewCount(req, boardId, statusCode);
        List<ArrivedApplierDetailsDTO> crewDetails = queryRepository.getWaitingCrewDetails(req, boardId, statusCode);


        return MyWaitingCrewResponseDTO.builder()
                .waitingCrew(crewCount)
                .content(crewDetails).build();
    }

    @Transactional(readOnly = true)
    public Application findbyId(Long apId){
        Application ap = applicationRepository.findById(apId)
                .orElseThrow(NotExistApIdException::new);
        return ap;
    }

    //중복 지원했을때
    public void checkDuplicateApplier(User req, ApplicationSaveRequestDTO info){
        System.out.println("queryRepository.checkDuplicateApply(req) = " + queryRepository.checkDuplicateApply(req, info));
        if (queryRepository.checkDuplicateApply(req, info) >= 1L){
            throw new DuplicateApplierException();
        }
    }

    //만료된 게시판에 지원했을때
    public void checkExpired(Board board){
        if ( !board.getViewable()){
            throw new ApplyToExpiredBoardException();
        } else if (board.getRecruitedCrew().equals(board.getTotalCrew())){
            throw new ApplyToExpiredBoardException();
        }
    }

    //게시글 작성자가 지원했을 때
    public void checkUserWriter(User applier, Board board){
        if (applier.getUid().equals(board.getUser().getUid())){
            throw new ApplyToBoardWriterException();
        }
    }

    //게시글 작성자가 지원했을 때
    public void checkEqualWriter(User req, Long boardId){
        Board board = boardRepository.findById(boardId).orElseThrow(NotExistBoardInIdException::new);

        if (!board.getUser().getUid().equals(req.getUid())){
            throw new NotMatchUidException();
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
