
const loginButttons = () => {
    document.getElementById('button_login').addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });
}


const login = (email, password) => {

    console.log(email, password);

    fetch('http://localhost:4000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                email: email,
                password: password
            }
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.user);
            localStorage.setItem('token', data.user.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = '../game/game.view.html';
        })
        .catch(error => {
            error_username.innerText = 'El usuario o correo ya existe';
            error_email.innerText = 'El usuario o correo ya existe';
        });
}



















document.addEventListener('DOMContentLoaded', (event) => {
    loginButttons();
});