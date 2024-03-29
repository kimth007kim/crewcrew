package matchTeam.crewcrew.repository.board;

import matchTeam.crewcrew.entity.board.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long>, JpaSpecificationExecutor<Board> {

    @Modifying(clearAutomatically = true)
    @Query("UPDATE Board b set b.hit = b.hit+1 WHERE b.id = ?1")
    void updateHitByBoardId(Long id);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE Board b set b.appliedCrew = b.appliedCrew+1 WHERE b.id = ?1")
    void increaseApplyByBoardId(Long id);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE Board b set b.appliedCrew = b.appliedCrew-1 WHERE b.id = ?1")
    void decreaseApplyByBoardId(Long id);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE Board b set b.recruitedCrew = b.recruitedCrew-1 WHERE b.id = ?1")
    void decreaseRecruitedByBoardId(Long id);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE Board b set b.recruitedCrew = b.recruitedCrew+1 WHERE b.id = ?1")
    void increaseRecruitedByBoardId(Long id);

    /*@Query("SELECT b FROM Board b WHERE b.viewable = true and (b.title like %?1% or b.boardContent like %?1%)")
    List<Board> findAllByKeyword(String keyword);*/

   // List<Board> searchBy(SearchRequestVO requestVO);
}