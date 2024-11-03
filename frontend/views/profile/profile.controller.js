const loadProfile = () => {
    const data = JSON.parse(localStorage.getItem('user'));
    console.log(data);
    document.getElementById('username').innerText = data.username;
    document.getElementById('img_profile').src = data.image;
    document.getElementById('email').innerText = data.email;
}




document.addEventListener('DOMContentLoaded', (event) => {
    loadProfile();

});