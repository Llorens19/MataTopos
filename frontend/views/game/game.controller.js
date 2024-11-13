let lives;
let timer;
let points;
let speed;
let coins = 0;
const skin = localStorage.getItem('skin') || 0;

const startGame = () => {
    coins = 0;
    points = 0;
    lives = 3;
    speed = 3000;
    document.getElementById('points').innerText = points;
    document.getElementById('coins').innerText = coins;

    document.getElementById('ranking').style.display = 'none';
    document.getElementById('skins').style.display = 'none';

    document.getElementById('corazon_1').src = '../../assets/img/corazon.png';
    document.getElementById('corazon_2').src = '../../assets/img/corazon.png';
    document.getElementById('corazon_3').src = '../../assets/img/corazon.png';
    hideAllMoles();
    document.getElementById('play').style.display = 'none';
    randomMole();
}

const buttons = () => {
    document.getElementById('play').addEventListener('click', startGame);
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.clear();
        window.location.href = '../home/home.view.html';
    });
    document.getElementById('button_profile').addEventListener('click', () => {
        localStorage.setItem('userProfile', localStorage.getItem('user'));
        window.location.href = '../profile/profile.view.html';
    });
    document.getElementById('skins').addEventListener('click', () => {
        window.location.href = '../skins/skins.view.html';
    });

    document.getElementById('ranking').addEventListener('click', () => {
        window.location.href = '../ranking/ranking.view.html';
    });
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

        img.src = `../../assets/img/saliendo_${skin}.png`;
        setTimeout(() => {
            img.src = `../../assets/img/topo_${skin}.png`;
            img.classList.add('visible');
            moleClick();
        }, 50);
    }
}

const increasePoints = () => {
    if (document.getElementsByClassName('visible')[0].classList.contains('golden')) {
        points = points + 200;
        coins = coins + 2;
    } else {
        points = points + 100;
        coins = coins + 1;
    }
    document.getElementById('points').innerText = points;
    document.getElementById('coins').innerText = coins;

    speed = speed > 300 ? speed - 100: speed ;
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
        img.src = `../../assets/img/saliendo_${skin}.png`;

        setTimeout(() => {
            img.src = '../../assets/img/agujero.png';
        }, 50);
    }
}

const hideAllMoles = () => {
    const visibleMoles = document.querySelectorAll('.visible');

    visibleMoles.forEach(mole => {
        mole.src = `../../assets/img/saliendo_${skin}.png`;

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
            document.getElementById(`topo_img_${id}`).src = `../../assets/img/golpe_${skin}.png`;
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



const gameOver = async () => {
    await textoGameOver();
    await botes()
    document.getElementById('play').style.display = '';
    hideAllMoles();
    saveCoins();
    savePoints();
    document.getElementById('ranking').style.display = 'block';
    document.getElementById('skins').style.display = 'block';
}


const saveCoins = () => {
    fetch('http://localhost:4000/user/coins', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ amount: coins })
    })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('user', JSON.stringify(data.user));
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
}

const savePoints = () => {
    fetch('http://localhost:4000/user/points', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ points: points })
    })
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
            }
        })
        .catch(error => {
            console.log(error);
        });
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
            document.getElementById('profile_img').src = `../../assets/profiles/${data.user.image}`;
        })
        .catch(error => {
            console.log(error);
            localStorage.clear();
            window.location.href = '../login/login.view.html';
        });
}

const loadHammerCursor = () => {
    const hammer = JSON.parse(localStorage.getItem('hammer')) || 0;
    document.body.style.cursor = `url("../../assets/martillo/martillo${hammer}.png"), auto`;

    document.body.addEventListener('mousedown', () => {
        document.body.style.cursor = `url("../../assets/martillo/martillo_golpeando${hammer}.png"), auto`;
    });
    document.body.addEventListener('mouseup', () => {
        document.body.style.cursor = `url("../../assets/martillo/martillo${hammer}.png"), auto`;
    });
}

const textoGameOver = () => {
    return new Promise((resolve) => {
        const gameOverText = document.getElementById("game-over");

        gameOverText.classList.remove("oculto");
        gameOverText.style.animation = "parpadeo 0.2s steps(1) 5";

        setTimeout(() => {
            gameOverText.classList.add("oculto");
            resolve();
        }, 1000);
    });
};

const botes = () => {
    return new Promise((resolve) => {
        let bonus = 0;
        let message = "";

        if (points >= 4000) {
            bonus = 40;
            message = "+40";
        } else if (points >= 3000) {
            bonus = 30;
            message = "+30";
        } else if (points >= 2000) {
            bonus = 20;
            message = "+20";
        } else if (points >= 1000) {
            bonus = 10;
            message = "+10";
        }

        if (bonus > 0) {
            const bote = document.getElementById("bote");
            document.getElementById("cant_bote").innerText = message;
            bote.style.display = 'flex';

            setTimeout(() => {
                bote.classList.add("animate");

                bote.addEventListener('animationend', () => {
                    bote.style.display = 'none';
                    bote.classList.remove("animate");
                    coins += bonus;
                    document.getElementById('coins').innerText = coins;
                    resolve();
                }, { once: true });

            }, 1000);

        } else {
            resolve();
        }
    });
};




document.addEventListener('DOMContentLoaded', (event) => {
    getUser();
    buttons();
    loadHammerCursor();

});






if (localStorage.getItem('token') === null) {
    window.location.href = '../login/login.view.html';
}