package matchTeam.crewcrew.repository.board;

import matchTeam.crewcrew.entity.board.Board;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

}