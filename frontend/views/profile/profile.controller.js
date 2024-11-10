const loadProfile = () => {
    const data = JSON.parse(localStorage.getItem('user'));
    console.log(data);
    document.getElementById('username').innerText = data.username;
    document.getElementById('img_profile').src = data.image;
    document.getElementById('email').innerText = data.email;
    document.getElementById('points').innerText = data.points;
    document.getElementById('coins').innerText = data.coins;
}

const loadSkins = () => {
    const data = JSON.parse(localStorage.getItem('user'));
    const skins = data.skins;

    skins.unshift(0);

    let html_skins = skins.map((skin) => {
        return `<img src="../../assets/img/topo_${skin}.png" class = "img_skin"/>`
    }).join('');
    document.getElementById('skins').innerHTML += html_skins;
}




document.addEventListener('DOMContentLoaded', (event) => {
    loadProfile();
    loadSkins();

});