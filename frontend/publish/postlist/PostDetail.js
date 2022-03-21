window.addEventListener("DOMContentLoaded", function(){


    const pagination = document.querySelector(".PaginationWrapper");
    function paginationAppend(){ //브라우저 사이즈에 따른 페이지네이션 생성
        let div, divLength, i, pageNum, paginationChild;
        i = 0;

        while(pagination.hasChildNodes()){ //페이지네이션 초기화
            pagination.removeChild(pagination.firstChild);
        }

        if(window.innerWidth>768){ //페이지네이션 갯수 설정
            divLength = 14;
        } else if(window.innerWidth>320) {
            divLength = 9;
        } else {
            divLength = 7;
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