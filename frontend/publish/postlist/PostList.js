window.addEventListener("DOMContentLoaded", function(){

    const body = document.querySelector("body");
    const buttonTop = document.querySelector(".ScrollTop");
    const buttonBottom = document.querySelector(".ScrollBottom");
    if(window.scrollY <= 100){
        buttonTop.classList.add("Disable");
    } else {
        buttonTop.classList.remove("Disable");
    }
    if(window.scrollY >= body.offsetHeight - screen.availHeight){
        buttonBottom.classList.add("Disable");
    } else {
        buttonBottom.classList.remove("Disable");
    }

    
    window.addEventListener("scroll", function(){ //스크롤 버튼 이벤트
        let scrollTop = window.scrollY;
        if(scrollTop <= 100){
            buttonTop.classList.add("Disable");
        } else {
            buttonTop.classList.remove("Disable");
        }
        if(scrollTop >= body.offsetHeight - screen.availHeight){
            buttonBottom.classList.add("Disable");
        } else {
            buttonBottom.classList.remove("Disable");
        }
    });

    buttonTop.addEventListener("click", function(){ //스크롤 버튼 이벤트
        if(!this.classList.contains("Disable")){
            window.scrollTo(0, 0);
        }
    });

    buttonBottom.addEventListener("click", function(){ //스크롤 버튼 이벤트
        if(!this.classList.contains("Disable")){
            window.scrollTo(0, body.offsetHeight);
        }
    });

    const FilterWrap = document.querySelector(".FilterWrapper");

    window.addEventListener("scroll", function(){ //스크롤 시 필터 sticky기능

        if(window.innerWidth>=768){
            if(window.scrollY >= 358){
                FilterWrap.classList.add("Fixed");
            } else {
                FilterWrap.classList.remove("Fixed");
            }
        } else {
            if(window.scrollY >= 240){
                FilterWrap.classList.add("Fixed");
            } else {
                FilterWrap.classList.remove("Fixed");
            }
        }
        
    });

    const filterButton = document.querySelector(".FilterButton");
    const filterDown = document.querySelector(".FliterListWrapper");
    const filterArrow = document.querySelector(".FilterArrow");
    let isClicked = true;
    filterButton.addEventListener("click", function(){ //모바일 필터 펼치기
        if(isClicked){
            filterDown.classList.add("On");
            filterArrow.classList.add("On");
        } else {
            filterDown.classList.remove("On");
            filterArrow.classList.remove("On");
        }
        isClicked = !isClicked;
    });

    const filterAll = document.querySelector("#CategoryAll");
    const filterCat = document.querySelectorAll(".FilterCategory");
    filterAll.addEventListener("click", function(i){ //전체 체크 시 카테고리 체크 해제
        filterCat.forEach(function(e){
            if(i.target.checked){
                e.checked = false;
            }
        });
    });
    filterCat.forEach(function(e){
        e.addEventListener("click", function(){ //카테고리 체크 시 전체 체크 해제
            if(this.checked){
                filterAll.checked = false;
            }
        });
    });

    const pagination = document.querySelector(".PaginationWrapper");
    function paginationAppend(){ //브라우저 사이즈에 따른 페이지네이션 생성
        let div, divLength, i, pageNum, paginationChild;
        i = 0;

        while(pagination.hasChildNodes()){ //페이지네이션 초기화
            pagination.removeChild(pagination.firstChild);
        }

        if(window.innerWidth>=768){ //페이지네이션 갯수 설정
            divLength = 14;
        } else {
            divLength = 9;
        }

        for(i; i<divLength; i++){ //페이지네이션 생성
            div = document.createElement("div");
            if(i!=0 && i!=1 && i!=divLength - 2 && i!=divLength - 1){
                pageNum = document.createTextNode(i - 1);
                div.appendChild(pageNum);
            }
            pagination.appendChild(div);
        }

        paginationChild = pagination.children; //페이지네이션 Arrow 지정
        paginationChild[0].classList.add("Prev2");
        paginationChild[1].classList.add("Prev");
        paginationChild[2].classList.add("On");
        paginationChild[paginationChild.length - 2].classList.add("Next");
        paginationChild[paginationChild.length - 1].classList.add("Next2");
    }

    paginationAppend();
    window.addEventListener("resize", paginationAppend);
});