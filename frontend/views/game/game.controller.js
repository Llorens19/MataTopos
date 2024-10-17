
const startGame = () => {
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
    img.classList.add('visible');

    setTimeout(() => {
        img.src = '../../assets/img/topo.png';

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


const randomMole = () => {
    const moleId = Math.floor(Math.random() * 5) + 1;
    showMole(moleId);


}

const moleClick = () => {

    const visibleMoles = document.querySelectorAll('.visible');
    visibleMoles.forEach(mole => {
        mole.replaceWith(mole.cloneNode(true));
    });



    document.getElementsByClassName('visible')[0].addEventListener('click', (event) => {

        console.log(event.target.id);

        const id = event.target.id.split('_')[2];
        hideMole(id);
        setTimeout(() => {
            randomMole();
        }, 1000);
    });
}






document.addEventListener('DOMContentLoaded', (event) => {
    buttons();

});