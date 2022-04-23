package matchTeam.crewcrew.service.message;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.controller.api.v1.board.BoardController;
import matchTeam.crewcrew.dto.board.BoardResponseDTO;
import matchTeam.crewcrew.dto.board.BoardSaveRequestDTO;
import matchTeam.crewcrew.dto.board.BoardSaveResponseDTO;
import matchTeam.crewcrew.dto.message.MessageResponseDTO;
import matchTeam.crewcrew.dto.message.MessageSendRequestDTO;
import matchTeam.crewcrew.dto.message.MessageSendResponseDTO;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.entity.board.Category;
import matchTeam.crewcrew.entity.message.Message;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.board.BoardRepository;
import matchTeam.crewcrew.repository.board.BoardSearchRepository;
import matchTeam.crewcrew.repository.message.MessageRepository;
import matchTeam.crewcrew.repository.message.MessageSearchRepository;
import matchTeam.crewcrew.repository.user.UserRepository;
import matchTeam.crewcrew.response.exception.board.*;
import matchTeam.crewcrew.response.exception.category.NotExistCategoryException;
import matchTeam.crewcrew.response.exception.message.NoMessageContentException;
import matchTeam.crewcrew.util.customException.UserNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MessageService {
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

    public void checkValidSend(MessageSendRequestDTO sendRequestDTO){
        if (sendRequestDTO.getMessageContent().isBlank()){
            throw new NoMessageContentException();
        }
    }

    @Transactional
    public MessageSendResponseDTO send(MessageSendRequestDTO req){
        User sendUser = userRepository.findById(req.getSendUserUID()).orElseThrow(UserNotFoundException::new);
        User recvUser = userRepository.findById(req.getRecvUserUID()).orElseThrow(UserNotFoundException::new);
        Message message = messageRepository.save(
                req.toEntity(req, sendUser, recvUser)
        );
        return MessageSendResponseDTO.builder()
                .res(message)
                .build();
    }
}
