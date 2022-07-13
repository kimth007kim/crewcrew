package matchTeam.crewcrew.dto.chat;

import lombok.*;
import matchTeam.crewcrew.dto.board.BoardPageDetailResponseDTO;
import matchTeam.crewcrew.dto.board.BoardPageResponseDTO;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.entity.chat.ChatMessage;
import matchTeam.crewcrew.entity.chat.ChatRoom;
import matchTeam.crewcrew.entity.user.User;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomListResponseDTO implements Comparable<RoomListResponseDTO> {
    private UUID roomId;

    private Long boardSeq;
    private boolean captain;
    private String boardTitle;


    private Other other;
    private Long categoryId;

    private String categoryName;
    private Long unReadCnt;
    private LocalDateTime recentMessageTime;
    private String recentMessageContent;
    private boolean delete;

    @Override
    public int compareTo(RoomListResponseDTO o) {
        return getRecentMessageTime().compareTo(o.getRecentMessageTime());
    }

//    @Builder
//    public RoomListResponseDTO(Page<RoomListResponseDTO> paged) {
//        this.roomId = paged.getContent().
//        this.boardSeq = boardSeq;
//        this.captain = captain;
//        this.boardTitle = boardTitle;
//        this.other = other;
//        this.categoryId = categoryId;
//        this.categoryName = categoryName;
//        this.unReadCnt = unReadCnt;
//        this.recentMessageTime = recentMessageTime;
//        this.recentMessageContent = recentMessageContent;
//    }


//    public static RoomListResponseDTO toDTO(Page<RoomListResponseDTO> page){
//        return RoomListResponseDTO.builder()
//                .res(page).build();
//    }

}
