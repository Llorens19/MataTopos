module.exports = (app) => {
    const { userLogin, registerUser, getCurrentUser, updateUser, increaseCoins } = require('../controllers/auth.controller.js');
    const verifyJWT = require('../middleware/verifyJWT.js');

    app.post('/users/login', userLogin);

    app.post('/users', registerUser);

    app.get('/user', verifyJWT, getCurrentUser);

    app.put('/user', verifyJWT, updateUser);

    app.put('/user/coins', verifyJWT, increaseCoins);

}