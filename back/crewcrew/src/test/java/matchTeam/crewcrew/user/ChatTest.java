package matchTeam.crewcrew.user;

import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.entity.user.test.Member;
import matchTeam.crewcrew.entity.user.test.MemberRepository;
import matchTeam.crewcrew.repository.chat.ChatRoomRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

//@Transactional
@SpringBootTest
public class ChatTest {

    @Autowired
    private ChatRoomRepository chatRoomRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Test
    @Transactional
    public void chatEntityIDcheck(){
        Member m1 = new Member();
        Member m2 = new Member();

        memberRepository.save(m1);
        memberRepository.save(m2);


        ChatRoom room = new ChatRoom();
        room.setPublisher(m1);
        room.setSubscriber(m2);

        chatRoomRepository.save(room);
        ChatRoom c = chatRoomRepository.getById(room.getRoomId());
        assertThat(c,is(room));
//        assertThat(members.size(),is(2));
//        System.out.println("룸의 번호는 ="+room.getRoomId());
    }
}
