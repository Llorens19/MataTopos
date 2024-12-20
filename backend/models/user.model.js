const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    bio: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: "perfil.png"
    },
    favouriteArticles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }],
    followingUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    skins: [{
        type: Number,
        default: 0
    }],
    coins: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    },
    hammers: [{
            type: Number,
            default: 0
        }
    ]
},
    {
        timestamps: true
    });

userSchema.plugin(uniqueValidator);

userSchema.methods.generateAccessToken = function () {
    const accessToken = jwt.sign({
        "user": {
            "id": this._id,
            "email": this.email,
            "password": this.password
        }
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
    );
    return accessToken;
}

userSchema.methods.toUserResponse = function () {
    return {
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image,
        coins: this.coins,
        points: this.points,
        skins: this.skins,
        hammers: this.hammers,
        token: this.generateAccessToken()
    }
};

userSchema.methods.toProfileJSON = function (user) {
    console.log('User', user);
    console.log('Following', user.isFollowing(this._id));
    return {
        username: this.username,
        bio: this.bio,
        image: this.image,
        following: user ? user.isFollowing(this._id) : false
    }
};

userSchema.methods.isFollowing = function (id) {
    const idStr = id.toString();
    for (const followingUser of this.followingUsers) {
        if (followingUser.toString() === idStr) {
            return true;
        }
    }
    return false;
};

userSchema.methods.follow = function (id) {
    if (this.followingUsers.indexOf(id) === -1) {
        this.followingUsers.push(id);
    }
    return this.save();
};

userSchema.methods.unfollow = function (id) {
    if (this.followingUsers.indexOf(id) !== -1) {
        this.followingUsers.remove(id);
    }
    return this.save();
};

userSchema.methods.isFavourite = function (id) {
    const idStr = id.toString();
    for (const article of this.favouriteArticles) {
        if (article.toString() === idStr) {
            return true;
        }
    }
    return false;
}

userSchema.methods.favorite = function (id) {
    if (this.favouriteArticles.indexOf(id) === -1) {
        this.favouriteArticles.push(id);
    }

    // const article = await Article.findById(id).exec();
    //
    // article.favouritesCount += 1;
    //
    // await article.save();

    return this.save();
}

userSchema.methods.unfavorite = function (id) {
    if (this.favouriteArticles.indexOf(id) !== -1) {
        this.favouriteArticles.remove(id);
    }

    // const article = await Article.findById(id).exec();
    //
    // article.favouritesCount -= 1;
    //
    // await article.save();

    return this.save();
};

module.exports = mongoose.model('User', userSchema);
