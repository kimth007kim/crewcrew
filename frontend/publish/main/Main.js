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

    let swiperProperty = function(num){
        return {
            slidesPerView: 3,
            navigation: {
                nextEl: '.ButtonNext' + num, 
                prevEl: '.ButtonPrev' + num
            },
            spaceBetween: 10,
            slidesPerView: 'auto',
            observer: true,
            observeParents: true,
            breakpoints: {
                768: {
                    spaceBetween: 30
                }
            }
        }
    };

    const swiper1 = new Swiper('.swiper1', swiperProperty(1));

    const swiper2 = new Swiper('.swiper2', swiperProperty(2));


});