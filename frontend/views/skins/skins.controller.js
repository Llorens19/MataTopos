const buySkin = (skin, price) => {
    fetch(`/api/skins/buy`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ skin: skin, price: price }),
    })
        .then(response => response.json())
        .then(data => {
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const userSkins = () => {
    const skins = JSON.parse(localStorage.getItem('user')).skins;
    skins.push(0);


    for (let i = 0; i < 6; i++) {
        if (skins.indexOf(i) != -1) {
            document.getElementById('galeria').innerHTML += `
        <div class="tarjeta_skin">
            <img src="../../assets/img/topo_0.png" alt="Skin 1" class="imagen_skin">
            <button class="boton_selecionar" id='skin_${i}'>Selecionar</button>
        </div>`;
        } else {
            document.getElementById('galeria').innerHTML += `
        <div class="tarjeta_skin">
            <img src="../../assets/img/topo_${i}.png" alt="Skin 1" class="imagen_skin">
            <p class="precio_skin">$${i * 20}</p>
            <button class="boton_comprar" id='skin_${i} price= "${i * 20}"'>Comprar</button>
        </div>`;
        }
    }

}


const selectedSkin = () => {
    const skin = localStorage.getItem('skin') || 0;
    const skinElement = document.getElementById(`skin_${skin}`);
    if (skinElement) {
        skinElement.classList.remove('boton_selecionar', 'boton_comprar');
        skinElement.classList.add('boton_selecionado');
        skinElement.innerHTML = 'Selecionado';
    }
}

const buttonBuy = () => {
    const buttons = document.querySelectorAll('.boton_comprar');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const skin = event.target.id.split('_')[1];
            const price = event.target.getAttribute('price');
            buySkin(skin, price);
        });
    });
}




document.addEventListener('DOMContentLoaded', (event) => {
    userSkins();
    selectedSkin();

});