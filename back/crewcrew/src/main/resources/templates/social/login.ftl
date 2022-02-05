<button onclick="popupKakaoLogin()">KakaoLogin</button>
<button onclick="popupNaverLogin()">NaverLogin</button>
<script>
    function popupKakaoLogin() {
        window.open('${kakaoLoginUri}', 'popupKakaoLogin', 'width=550,height=1200,scrollbars=0,toolbar=0,menubar=no')
    }
    function popupNaverLogin() {
        window.open('${naverLoginUrl}', 'popup네이버Login', 'width=550,height=1200,scrollbars=0,toolbar=0,menubar=no')
    }
</script>