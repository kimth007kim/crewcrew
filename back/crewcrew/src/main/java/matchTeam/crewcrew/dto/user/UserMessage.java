package matchTeam.crewcrew.dto.user;

public enum UserMessage {
    M0( 0,"반갑습니다! 즐거운 항해 해봐요!"),
    M1( 1,"나는 항해왕이 될거야!"),
    M2( 2,"너에게는 아직 꿈을 이루기 위한 충분한 시간이 있어!"),
    M3( 3,"잃은 것만 세지마! 없는 건 이제 없어!"),
    M4( 4,"할 수 있냐는 중요하지 않아, 하고 싶으니까 하는거야");

    private int index;
    private final String message;
    UserMessage(int index,String message) {
        this.index =index;
        this.message = message;
    }
    public String getMessage(){
        return message;
    }
    public int getIndex(){
        return index;
    }
}
