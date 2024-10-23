const registerValidation = () => {
    let error = false;
    console.log('hola');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirm_password = document.getElementById('confirm_password');

    const error_username = document.getElementById('error_username');
    const error_email = document.getElementById('error_email');
    const error_password = document.getElementById('error_password');
    const error_confirm_password = document.getElementById('error_confirm_password');

    const regex_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const regex_username = /^[a-zA-Z0-9]{3,20}$/;
    const regex_password = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!regex_username.test(username.value)) {
        console.log("fallo1")
        error_username.innerText = 'El nombre de usuarion no es valido';
        error = true;
    } else {
        error_username.innerText = '';
    }

    if (!regex_email.test(email.value)) {
        console.log("fallo2")
        error_email.innerText = 'El email no es valido';
        error = true;
    } else {
        error_email.innerText = '';
    }

    if (!regex_password.test(password.value)) {
        console.log("fallo3")
        error_password.innerText = 'La contraseña debe tener al menos 8 caracteres una minúscula y un número';
        error = true;
    } else {
        error_password.innerText = '';
    }
    if (password.value != confirm_password.value) {


        console.log("fallo4")
        error_confirm_password.innerText = 'Las contraseñas no coinciden';
        error = true;
    } else {
        error_confirm_password.innerText = '';
    }

    console.log(password.value)
    console.log(confirm_password.value)
    console.log(error)



    if (!error) {
        console.log('todo correcto');

        fetch('http://localhost:4000/users', {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    username: username.value,
                    email: email.value,
                    password: password.value
                }
            }),
        })
            .then(response => response.json())
            .then(data => {
                window.location.href = '../login/login.view.html';
            })
            .catch(error => {
                error_username.innerText = 'El usuario o correo ya existe';
                error_email.innerText = 'El usuario o correo ya existe';
            });
    }
}


const registerButton = () => {
    document.getElementById('button_register').addEventListener('click', registerValidation);
}






document.addEventListener('DOMContentLoaded', () => {

    registerButton();

});