let lives = 0;
let timer;

const startGame = () => {
    lives = 3;
    hideAllMoles();
    document.getElementById('play').style.display = 'none';
    randomMole();
}

const buttons = () => {
    document.getElementById('play').addEventListener('click', startGame);
}




const showMole = (idMole) => {
    const img = document.getElementById(`topo_img_${idMole}`);
    img.src = '../../assets/img/saliendo.png'


    setTimeout(() => {
        img.src = '../../assets/img/topo.png';
        img.classList.add('visible');
        moleClick();
    }, 50);
}




const hideMole = (idMole) => {
    const img = document.getElementById(`topo_img_${idMole}`);
    img.src = '../../assets/img/saliendo.png';
    img.classList.remove('visible');
    setTimeout(() => {
        img.src = '../../assets/img/agujero.png';
    }, 50);
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
        }, 3000);


    } else {
        document.getElementById('play').style.display = 'show';
    }
}

const moleClick = () => {
    const visibleMoles = document.querySelectorAll('.img_corazon');
    visibleMoles.forEach(mole => {
        mole.replaceWith(mole.cloneNode(true));
    });
    document.getElementsByClassName('visible')[0].addEventListener('click', (event) => {
        clearTimeout(timer);
        console.log(event.target.id);
        const id = event.target.id.split('_')[2];
        document.getElementById(`topo_img_${id}`).src = '../../assets/img/golpe.png';

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

document.addEventListener('DOMContentLoaded', (event) => {
    buttons();

});