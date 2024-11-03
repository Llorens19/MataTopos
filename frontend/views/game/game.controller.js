let lives;
let timer;
let points;
let speed;

const startGame = () => {
    points = 0;
    lives = 3;
    speed = 3000;
    document.getElementById('corazon_1').src = '../../assets/img/corazon.png';
    document.getElementById('corazon_2').src = '../../assets/img/corazon.png';
    document.getElementById('corazon_3').src = '../../assets/img/corazon.png';
    hideAllMoles();
    document.getElementById('play').style.display = 'none';
    randomMole();
}

const buttons = () => {
    document.getElementById('play').addEventListener('click', startGame);
}




const showMole = (idMole) => {
    const goleden = isGolden();
    const img = document.getElementById(`topo_img_${idMole}`);
    if (goleden) {
        img.src = '../../assets/img/topo_dorado_saliendo.png'
        setTimeout(() => {
            img.src = '../../assets/img/topo_dorado.png';
            img.classList.add('visible');
            img.classList.add('golden');
            moleClick();
        }, 50);


    } else {

        img.src = '../../assets/img/saliendo.png'
        setTimeout(() => {
            img.src = '../../assets/img/topo.png';
            img.classList.add('visible');
            moleClick();
        }, 50);
    }
}

const increasePoints = () => {
    if (document.getElementsByClassName('visible')[0].classList.contains('golden')) {
        points = points + 1000;
    } else {
        points = points + 100;
    }
    document.getElementById('points').innerText = points;
    speed = speed - 100;
}




const hideMole = (idMole) => {
    const visibleMoles = document.querySelectorAll('.img_corazon');
    visibleMoles.forEach(mole => {
        mole.replaceWith(mole.cloneNode(true));
    });
    const img = document.getElementById(`topo_img_${idMole}`);
    const isGolden = img.classList.contains('golden');
    img.classList.remove('visible');
    img.classList.remove('golden');

    if (isGolden) {
        img.src = '../../assets/img/topo_dorado_saliendo.png';
        setTimeout(() => {
            img.src = '../../assets/img/agujero.png';
        }, 50);

    } else {
        img.src = '../../assets/img/saliendo.png';

        setTimeout(() => {
            img.src = '../../assets/img/agujero.png';
        }, 50);
    }
}

const hideAllMoles = () => {
    const visibleMoles = document.querySelectorAll('.visible');

    visibleMoles.forEach(mole => {
        mole.src = '../../assets/img/saliendo.png'

        setTimeout(() => {
            mole.src = '../../assets/img/agujero.png';
            mole.classList.remove('visible');
        }, 50);
    });
}

const discountLife = () => {
    document.getElementById(`corazon_${lives}`).src = '../../assets/img/corazon_usado.png';
    lives--;
}



const randomMole = () => {
    if (lives > 0) {
        const moleId = Math.floor(Math.random() * 5) + 1;
        showMole(moleId);

        timer = setTimeout(() => {
            hideMole(moleId);
            discountLife();

            setTimeout(() => {
                randomMole();
            }, 1000);
        }, speed);


    } else {
        gameOver();
    }
}

const isGolden = () => {
    const random_6 = Math.floor(Math.random() * 6) + 1;
    if (random_6 === 1) {
        return true;
    } else {
        return false;
    }
}

const moleClick = () => {
    const visibleMoles = document.querySelectorAll('.img_corazon');
    visibleMoles.forEach(mole => {
        mole.replaceWith(mole.cloneNode(true));
    });
    document.getElementsByClassName('visible')[0].addEventListener('click', (event) => {
        clearTimeout(timer);
        increasePoints();
        console.log(event.target.id);
        const id = event.target.id.split('_')[2];
        if (document.getElementById(`topo_img_${id}`).classList.contains('golden')) {
            document.getElementById(`topo_img_${id}`).src = '../../assets/img/golpe_dorado.png';
        } else {
        document.getElementById(`topo_img_${id}`).src = '../../assets/img/golpe.png';
        }
        const img = document.getElementById(`topo_img_${id}`);
        img.classList.remove('visible');



        setTimeout(() => {
            hideMole(id);
        }, 500);

        setTimeout(() => {
            randomMole();
        }, 1000);
        const visibleMoles = document.querySelectorAll('.img_corazon');
        visibleMoles.forEach(mole => {
            mole.replaceWith(mole.cloneNode(true));
        });
    });
}



const gameOver = () => {
    document.getElementById('play').style.display = '';
    hideAllMoles();
}



const getUser = () => {
    fetch('http://localhost:4000/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('username').innerText = data.user.username;
            document.getElementById('profile_img').src = data.user.image;
        })
        .catch(error => {
            console.log(error);
            window.location.href = '../login/login.view.html';
        });
}


document.addEventListener('DOMContentLoaded', (event) => {
    getUser();
    buttons();

});