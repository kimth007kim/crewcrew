window.addEventListener("DOMContentLoaded", function(){

    const Search = document.querySelector("button.Search");
    Search?.addEventListener('click', function(){ //검색창 내리기
        document.querySelector(".ChatBoxSearch").classList.toggle("On");
    }); 

    const Set = document.querySelector("button.Set");
    Set?.addEventListener('click', function(){ //옵션버튼
        document.querySelector(".ChatBoxList").classList.toggle("On");
        document.querySelector(".DeleteBox").classList.toggle("On");
    });

    const ResetBtn = document.querySelector(".DeleteBox>button");
    ResetBtn?.addEventListener('click', function(){ //선택취소 버튼
        document.querySelector(".ChatBoxList").classList.remove("On");
        document.querySelector(".DeleteBox").classList.remove("On");
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
});