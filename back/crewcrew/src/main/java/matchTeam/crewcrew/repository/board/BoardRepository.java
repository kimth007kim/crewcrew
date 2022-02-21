package matchTeam.crewcrew.repository.board;

import matchTeam.crewcrew.entity.board.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    @Modifying(clearAutomatically = true)
    @Query("UPDATE Board b set b.hit = b.hit+1 WHERE b.id = ?1")
    void updateHitByBoardId(Long id);
}