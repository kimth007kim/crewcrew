window.addEventListener("DOMContentLoaded", function(){

    const Search = document.querySelector("button.Search");
    Search?.addEventListener('click', function(){ //검색창 내리기
        document.querySelector(".ChatBoxSearch").classList.toggle("On");
        document.querySelector(".ChatBoxBody").classList.toggle("Search");
    }); 

    const Set = document.querySelector("button.Set");
    Set?.addEventListener('click', function(){ //옵션버튼
        if(document.querySelector(".ChatBoxList")) {
            document.querySelector(".ChatBoxList").classList.toggle("On");
            document.querySelector(".DeleteBox")?.classList.toggle("On");
            this.classList.toggle('On');
        }
    });

    const ResetBtn = document.querySelector(".DeleteBox>button");
    ResetBtn?.addEventListener('click', function(){ //선택취소 버튼
        document.querySelector(".ChatBoxList").classList.remove("On");
        document.querySelector(".DeleteBox").classList.remove("On");
        Set.classList.remove('On');
    });

    const checkProp = document.querySelectorAll(".checkProp");
    const checkAll = document.querySelector(".checkAll");
    checkProp?.forEach(e => { //체크버튼 다 누를때 모두체크 활성화
        e.addEventListener('change', function(){
            if(document.querySelectorAll(".checkProp:checked").length == checkProp.length){
                checkAll.checked = true;
            } else {
                checkAll.checked = false;
            }
        });
    });

    checkAll?.addEventListener('change', function(){ //모두체크시
        if(this.checked){
            checkProp.forEach(e => {
                e.checked = true;
            });
        } else {
            checkProp.forEach(e => {
                e.checked = false;
            });
        }
    });

    const chatDt = document.querySelector(".ChatBoxBody.Dt");
    const chatList = document.querySelectorAll(".ChatDtWrapper");
    const chatForm = document.querySelector(".ChatBoxBottom form");
    const chatTxt = document.querySelector(".ChatInput");
    const chatBtn = document.querySelector(".ChatPost");
    let chatDtHeight = 0;
    chatList?.forEach(e => {
        chatDtHeight += e.offsetHeight;
    });

    function chatDtHeightFunc() { //채팅창 하단 스크롤 이동 함수
        chatDtHeight = 0;
        chatList?.forEach(e => {
            chatDtHeight += e.offsetHeight;
        });
        chatDt?.scroll(0, chatDtHeight);
    }
    
    function ChatSubmit(e) { //채팅 입력시 채팅추가함수
        e.preventDefault();
        
        if(chatTxt.value){
            let Now = new Date();
            let NowHours = (`0${Now.getHours()}`).slice(-2);
            let NowMinutes = (`0${Now.getMinutes()}`).slice(-2);
            let Time = `${NowHours}:${NowMinutes}`;

            let chatDom = document.createElement("div");
            chatDom.classList.add('ChatDt');
            chatDom.classList.add('Me');
            chatDom.innerHTML = `
                <div class="ChatTxt">
                   ${chatTxt.value}
                </div>
                <p class="Time">${Time}</p>`;
            [...chatList].at(-1).appendChild(chatDom);

            let scrollFuncValue = chatDtHeight - chatDt.offsetHeight;
            chatDt.scrollTop >= scrollFuncValue && chatDtHeightFunc(); //최근 채팅을 보고있을때만 스크롤시키기

            chatTxt.value = ''; //초기화
            chatBtn.classList.remove("On"); //초기화
        }
    }
    chatDtHeightFunc();
    window.addEventListener('resize', chatDtHeightFunc);
    chatForm?.addEventListener('submit', ChatSubmit);

    chatTxt?.addEventListener('keyup', function(e){ //채팅버튼 활성화
        if(e.target.value) {
            if(e.keyCode == 13) { //엔터키 칠때 submit시키기
                e.target.value.length > 1 ? chatBtn.click() : e.target.value = '';
            } else {
                chatBtn.classList.add("On");
            }
        } else { 
            chatBtn.classList.remove("On");
        }
    });
});