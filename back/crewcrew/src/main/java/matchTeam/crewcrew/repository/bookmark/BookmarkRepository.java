package matchTeam.crewcrew.repository.bookmark;

import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.bookmark.Bookmark;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long>, JpaSpecificationExecutor<Bookmark> {
    Optional<Bookmark> findByUidAndBoardId(User uid, Board boardId);
}
