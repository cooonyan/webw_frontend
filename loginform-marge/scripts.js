function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
        alert('이메일과 비밀번호를 입력해주세요.');
        return;
    }

    // 여기에 로그인 처리를 위한 추가 로직을 작성할 수 있습니다.
    alert(`이메일: ${email}\n비밀번호: ${password}`);
}
