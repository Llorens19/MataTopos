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


const buyHammer = (hammer, price) => {
    fetch(`http://localhost:4000/user/buy/hammer`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ hammer: hammer, price: price }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.user) {
                localStorage.setItem('hammer', JSON.stringify(data.user));
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
            document.getElementById('galeria-topos').innerHTML += `
                <div class="tarjeta_skin">
                    <img src="../../assets/img/topo_${i}.png" alt="Skin ${i}" class="imagen_skin">
                    <button class="boton_selecionar" id="skin_${i}" skin='${i}'>Seleccionar</button>
                </div>`;
        } else {
            document.getElementById('galeria-topos').innerHTML += `
                <div class="tarjeta_skin">
                    <img src="../../assets/img/topo_${i}.png" alt="Skin ${i}" class="imagen_skin">
                    <p class="precio_skin">$${i * 20}</p>
                    <button class="boton_comprar" id="skin_${i}" skin='${i}' price="${i * 20}">Comprar</button>
                </div>`;
        }
    }
    checkSelectedSkin();
}

const userHammers = () => {
    const hammers = JSON.parse(localStorage.getItem('user')).hammers;
    hammers.push(0);

    for (let i = 0; i < 6; i++) {
        if (hammers.indexOf(i) != -1) {
            document.getElementById('galeria-martillos').innerHTML += `
                <div class="tarjeta_skin_comprada">
                    <img src="../../assets/martillo/martillo${i}.png" alt="Hammer ${i}" class="imagen_skin_martillo">
                    <button class="boton_selecionar_martillo" id="hammer_${i}" hammer='${i}'>Seleccionar</button>
                </div>`;
        } else {
            document.getElementById('galeria-martillos').innerHTML += `
                <div class="tarjeta_skin">
                    <img src="../../assets/martillo/martillo${i}.png" alt="Hammer ${i}" class="imagen_skin_martillo">
                    <p class="precio_skin">$${i * 100}</p>
                    <button class="boton_comprar_martillo" id="hammer_${i}" hammer='${i}' price="${i * 100}">Comprar</button>
                </div>`;
        }
    }
    checkSelectedHammer();
}

const checkSelectedSkin = () => {
    const skin = localStorage.getItem('skin') || 0;
    const skinElement = document.getElementById(`skin_${skin}`);
    if (skinElement) {
        skinElement.classList.remove('boton_selecionar', 'boton_comprar');
        skinElement.classList.add('boton_selecionado');
        skinElement.innerHTML = 'Seleccionar';
    }
}

const checkSelectedHammer = () => {
    
    const hammers = JSON.parse(localStorage.getItem('user')).hammers;
    
    const hammer = localStorage.getItem('hammer') || 0;
    
    const hammerElement = document.getElementById(`hammer_${hammer}`);
    if (hammerElement) {
        hammerElement.classList.remove('boton_selecionar_martillo', 'boton_comprar_martillo');
        hammerElement.classList.add('boton_selecionado_martillo');
        hammerElement.innerHTML = 'Seleccionar';
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

const buttonBuyHammer = () => {
    const buttons = document.querySelectorAll('.boton_comprar_martillo');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const hammer = event.target.getAttribute('hammer');
            const price = event.target.getAttribute('price');
            console.log(hammer, price);
            buyHammer(hammer, price);
        });
    });
}

const selectSkin = () => {
    const buttons = document.querySelectorAll('.boton_selecionar');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const skin = event.target.getAttribute('skin');
            localStorage.setItem('skin', skin);
           
            document.querySelectorAll('.boton_selecionado').forEach(element => {
                element.classList.remove('boton_selecionado');
                element.classList.add('boton_selecionar');
                event.target.innerHTML = 'Seleccionar';
            });
            
            event.target.classList.remove('boton_selecionar');
            event.target.classList.add('boton_selecionado');
            event.target.innerHTML = 'Seleccionar';
            selectSkin();

            
        });
    });
}

const selectHammer = () => {
    const buttons = document.querySelectorAll('.boton_selecionar_martillo');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const hammer = event.target.getAttribute('hammer');
            localStorage.setItem('hammer', hammer);
            
            document.querySelectorAll('.boton_selecionado_martillo').forEach(element => {
                element.classList.remove('boton_selecionado_martillo');
                element.classList.add('boton_selecionar_martillo');
                event.target.innerHTML = 'Seleccionar';
            });
            
            event.target.classList.remove('boton_selecionar_martillo');
            event.target.classList.add('boton_selecionado_martillo');
            event.target.innerHTML = 'Seleccionar'; 
            selectHammer();
            
            
        });
    });
}


const handleNavigation = () => {
    const linkTopos = document.getElementById('link-topos');
    const linkMartillos = document.getElementById('link-martillos');

    linkTopos.addEventListener('click', () => {
        document.getElementById('seccion-topos').style.display = 'block';
        document.getElementById('seccion-martillos').style.display = 'none';
        
        linkTopos.classList.add('enlace-activo');
        linkMartillos.classList.remove('enlace-activo');
    });

    linkMartillos.addEventListener('click', () => {
        document.getElementById('seccion-topos').style.display = 'none';
        document.getElementById('seccion-martillos').style.display = 'block';
        
        linkMartillos.classList.add('enlace-activo');
        linkTopos.classList.remove('enlace-activo');
    });
}


const loadCoine = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('coins').innerHTML = user.coins;
}


document.addEventListener('DOMContentLoaded', (event) => {
    userSkins();
    userHammers(); 
    handleNavigation(); 
    loadCoine(); 
    buttonBuy(); 
    buttonBuyHammer();
    selectSkin(); 
    selectHammer();
});
