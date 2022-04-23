package matchTeam.crewcrew.dto.message;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.message.Message;
import matchTeam.crewcrew.entity.user.User;
import matchTeam.crewcrew.repository.user.UserRepository;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Getter
public class MessageSendRequestDTO {

    @ApiModelProperty(value = "쪽지 내용", notes = "쪽지 내용을 입력해주세요", required = true, example = "my message")
    @NotBlank(message = "쪽지 내용을 입력해주세요.")
    private String messageContent;

    @ApiModelProperty(value = "유저의 uid", notes = "보내는 유저의 uid", required = true, example = "1")
    @NotNull(message = "보내는 유저 uid를 넣어주세요.")
    private Long sendUserUID;

    @ApiModelProperty(value = "유저의 uid", notes = "받는 유저의 uid", required = true, example = "2")
    @NotNull(message = "받는 유저 uid를 넣어주세요.")
    private Long recvUserUID;

    @Builder
    public MessageSendRequestDTO(String messageContent, Long sendUserUID, Long recvUserUID){
        this.messageContent = messageContent;
    }

    public Message toEntity(MessageSendRequestDTO req, User sendUser, User recvUser){
        return Message.builder()
                .messageContent(req.messageContent)
                .sendUser(sendUser)
                .recvUser(recvUser)
                .build();
    }
}

