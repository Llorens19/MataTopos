const authService = require("../services/auth.service.js");
const asyncHandler = require('express-async-handler');


const userLogin = asyncHandler(async (req, res) => {
    const { status, result } = await authService.userLogin(req.body);
    console.log(req.body);
    return res.status(status).json(result);
});

const registerUser = asyncHandler(async (req, res) => {
    const { status, result } = await authService.registerUser(req.body);
    return res.status(status).json(result);
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const { status, result } = await authService.getCurrentUser(req.userEmail);
    return res.status(status).json(result);
});

const updateUser = asyncHandler(async (req, res) => {
    const { status, result } = await authService.updateUser(req);
    return res.status(status).json(result);
});

const increaseCoins = asyncHandler(async (req, res) => {
    const { status, result } = await authService.increaseCoins(req);
    return res.status(status).json(result);
});

const buySkin = asyncHandler(async (req, res) => {
    const { status, result } = await authService.buySkin(req);
    return res.status(status).json(result);
});


module.exports = {
    userLogin,
    registerUser,
    getCurrentUser,
    updateUser,
    increaseCoins,
    buySkin

}