window.addEventListener("DOMContentLoaded", function(){

    const InfoBody = document.querySelector(".myInfoBody");
    const InfoButton = document.querySelector(".ButtonFull3");
    let InfoBodyHeight, isOn;
    
    InfoButton?.addEventListener("click", function(){
        if(window.innerWidth <= 820){
            isOn ? 
            (InfoBody.style.height = InfoBodyHeight + "px", 
            InfoButton.innerText = "저장") :
            (InfoBody.style.height = 0,
            InfoButton.innerText = "프로필 관리하기");
            isOn = !isOn;
        }
    });
    function mobileView(){
        if(InfoBody && InfoButton){
            InfoBody.style.height = 'auto';
            InfoBodyHeight = InfoBody.clientHeight;
            isOn = true;
            window.innerWidth <= 820 ?
            (InfoButton.innerText = "프로필 관리하기",
            InfoBody.style.height = 0) :
            (InfoButton.innerText = "저장",
            InfoBody.style.height = InfoBodyHeight);
        }
    }
    mobileView();
    window.addEventListener("resize", mobileView);


    const Profile = document.querySelectorAll(".ProfileBox>img");
    const Name = document.querySelectorAll(".PostCardHead>.TextBox>.Name");
    Profile?.forEach((el)=> { //프로필 클릭시 툴팁노출
        el.addEventListener("click", function() {
            const ToolTip = this.closest(".PostCardHead").lastElementChild;
            ToolTip.style.display = 'block';
            ToolTip.style.top = 0;
            if(window.innerWidth >= 820) {
                ToolTip.style.left = '72px';
            } else {
                ToolTip.style.left = '40px';
            }
        });
    });
    Name?.forEach((el)=> { //닉네임 클릭시 툴팁 노출
        el.addEventListener("click", function() {
            const ToolTip = this.closest(".PostCardHead").lastElementChild;
            ToolTip.style.display = 'block';
            ToolTip.style.top = '64px';
            ToolTip.style.left = '72px';
        });
    });

    const ToolTipNode = document.querySelectorAll(".ProfileToolTip");
    document.addEventListener("click", function(e) { //툴팁 가리기
        if(ToolTipNode.length) { //ToolTip이 존재할떄
            if(e.target.classList[0] != 'Name' && e.target.classList[0] != 'ProfileIMG'){ //프로필이미지나 닉네임 이외 클릭했을 때
                ToolTipNode.forEach((el) => el.style.display = 'none');
            } else {
                const idxNode = e.target.closest('li');
                const idxTarget = [...document.querySelector(".PostWrapper ul").children]; //프로필이미지나 닉네임 클릭했을 때
                const idx = idxTarget.indexOf(idxNode);
                ToolTipNode.forEach((el, index) => {
                    if(idx != index) el.style.display = 'none';
                });
            }
        } 
    });
    
});