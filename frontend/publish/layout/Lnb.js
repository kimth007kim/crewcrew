window.addEventListener("DOMContentLoaded", function(){

    const navArrow = document.querySelector(".NavArrow");
    const header = document.querySelector("header");
    const navHam = document.querySelector('.NavHam');
    navArrow.addEventListener('click',lnbOpen);
    navHam.addEventListener('click',lnbOpen);
    function lnbOpen(){
        if(!header.classList.contains('On')){
            header.classList.add('On');
            navArrow.classList.add('On');
            document.querySelector('.NavContWrapper').classList.add('On');
            navHam.classList.add('On');
        } else {
            header.classList.remove('On');
            navArrow.classList.remove('On');
            document.querySelector('.NavContWrapper').classList.remove('On');
            navHam.classList.remove('On');
        }
    }
});