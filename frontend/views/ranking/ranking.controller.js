const rankingData = () => {
    return fetch('http://localhost:4000/ranking', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    })
        .then(response => response.json())
        .then(data => {
            return data.ranking; 
        })
        .catch(error => {
            console.log(error);
        });
}

const rankingTable = async () => {
    const ranking = await rankingData();
    console.log(ranking);
    const tbody = document.querySelector('.cuerpo_tabla');
    tbody.innerHTML = '';

    ranking.forEach((player, index) => {
        const row = document.createElement('tr');
        row.classList.add('fila_jugador');

        row.innerHTML = `
            <td class="posicion">${index + 1}</td>
            <td class="imagen">
                <img src="../../assets/profiles/${player.image}" class = "img_player" alt="imagen${index + 1}">
            </td>
            <td class="nombre_jugador">${player.username}</td>
            <td class="puntaje">${player.points}</td>
            <td class="monedas">
                <div class="contenedor_monedas">
                    <p>${player.coins}</p>
                    <img src="../../assets/img/moneda.png" class = "img_moneda" alt="moneda">
                </div>
            </td>
        `;

        tbody.appendChild(row);
    });
    viewUserProfile();
}

const viewUserProfile = () => {
    document.querySelectorAll('.fila_jugador').forEach(row => {
        row.addEventListener('click', () => {
            console.log(row);
            const username = row.querySelector('.nombre_jugador').textContent;
            fetch(`http://localhost:4000/user/profile/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('userProfile', JSON.stringify(data.user));
                    window.location.href = '../profile/profile.view.html';
                })
                .catch(error => {
                    console.log(error);
                }
            );
        });
    });
}



document.addEventListener('DOMContentLoaded', async (event) => {
    rankingTable();
    
});