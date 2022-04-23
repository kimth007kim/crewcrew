package matchTeam.crewcrew.repository.message;

import matchTeam.crewcrew.entity.message.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long>, JpaSpecificationExecutor<Message> {

/*    @Modifying(clearAutomatically = true)
    @Query("UPDATE Message m set m.readChk = True WHERE m.readTime IS NOT NULL")
    void updateReadChkByMessageID(Long id);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE Message m set m.readTime = True WHERE m.messageID = ?1")
    void updateReadTimeByMessageID(Long id);*/
}