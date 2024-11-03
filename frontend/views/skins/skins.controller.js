const buySkin = (skin, price) => {
    fetch(`http://localhost:4000/user/buy`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ skin: skin, price: price }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.reload();
            } else {
                alert("No tienes suficientes monedas");
            }

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
            <img src="../../assets/img/topo_${i}.png" alt="Skin 1" class="imagen_skin">
            <button class="boton_selecionar" skin='${i}'>Selecionar</button>
        </div>`;
        } else {
            document.getElementById('galeria').innerHTML += `
        <div class="tarjeta_skin">
            <img src="../../assets/img/topo_${i}.png" alt="Skin 1" class="imagen_skin">
            <p class="precio_skin">$${i * 20}</p>
            <button class="boton_comprar" id="boton_comprar" skin='${i}' price= "${i * 20}"'>Comprar</button>
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
            const skin = event.target.getAttribute('skin');
            const price = event.target.getAttribute('price');
            console.log(skin, price);
            buySkin(skin, price);
        });
    });
}

const buttons = () => {
    document.getElementById('boton_comprar').addEventListener('click', buttonBuy);
}




document.addEventListener('DOMContentLoaded', (event) => {
    userSkins();
    selectedSkin();
    buttons();

});