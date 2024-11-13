async function loadRanking() {
    const rankingData = await fetchRankingData();
    const tbody = document.querySelector('.cuerpo_tabla');
    tbody.innerHTML = '';

    rankingData.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="../../assets/profiles/${player.image}" alt="imagen" class="img_player"></td>
            <td>${player.username}</td>
            <td>${player.points}</td>
            <td>
                <div class="contenedor_monedas">
                    <span>${player.coins}</span>
                    <img src="../../assets/img/moneda.png" alt="moneda" class="img_moneda">
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function fetchRankingData() {
    try {
        const response = await fetch('http://localhost:4000/ranking', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        return data.ranking;
    } catch (error) {
        console.error(error);
        return [];
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadRanking();

    document.getElementById('register-btn').addEventListener('click', () => {
        window.location.href = '../register/register.view.html';
    });

    document.getElementById('login-btn').addEventListener('click', () => {
        window.location.href = '../login/login.view.html';
    });
});
