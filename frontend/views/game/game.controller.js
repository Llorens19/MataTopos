
const startGame = () => {
    hideAllMoles();



}



const buttons = () => {
    document.getElementById('play').addEventListener('click', startGame);
}


const showMole = (idMole) => {
    const img = document.getElementById(`topo_img_${idMole}`);
    img.src = '../../assets/img/saliendo.png'

    setTimeout(() => {
        img.src = '../../assets/img/topo.png';
        img.classList.add('visible;');
    }, 50);
}

const hideMole = (idMole) => {
    const img = document.getElementById(`topo_img_${idMole}`);
    img.src = '../../assets/img/saliendo.png';
    setTimeout(() => {
        img.src = '../../assets/img/agujero.png';
        img.classList.remove('visible');
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










document.addEventListener('DOMContentLoaded', (event) => {
    buttons();

});