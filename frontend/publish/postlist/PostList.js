window.addEventListener("DOMContentLoaded", function(){

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
});