const { User } = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

async function register(req, res) {
    const canditade = await User.findOne({username: req.body.username});

    if(canditade) {
        res.status(409).json({
            message: 'This username is already exist'
        })
    } else {
        const salt = bcryptjs.genSaltSync(10);

        const user = new User({
            username: req.body.username,
            password: bcryptjs.hashSync(req.body.password, salt),
            imgSrc: req.file ? req.file.path : '',
            createdDate: req._startTime
        });

        try{
          await user.save();  
          const {password, ...data} = user;
          res.status(201).json(data);
        } catch(e) {
            errorHandler(res, e)
        }
    }
}

async function login(req, res) {
    const canditade = await User.findOne({username: req.body.username});

    if(canditade) {
        const passwordResult = bcryptjs.compareSync(req.body.password, canditade.password);

        if(passwordResult) {
            const token = jwt.sign({
                username: canditade.username,
                userId: canditade._id
            }, key.jwt);
            const day = 24 * 60 * 60 * 1000;
            res.cookie('jwt', token, { httpOnly: true, maxAge: day });
            const {password, ...data} = canditade;
            res.status(200).json(data._doc);
        } else {
            res.status(401).json({
                message: 'Password is wrong. Try again'
            })
        }
    } else{
        res.status(404).json({
            message: 'User not found'
        })
    }
}

async function getAuth(req, res) {
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, key.jwt);

        if (!claims) {
            return res.status(401).send({ message: 'Unauthenticated' });
        }

        const user = await User.findOne({ _id: claims.userId });
        const { password, ...data } = await user.toJSON();
        res.send(data);
    } catch {
        return res.status(401).send({ message: 'Unauthenticated' });
    }
}

function logout(req, res) {
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.send({ message: 'Success' });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}


module.exports = {
    login,
    register,
    getAuth,
    logout
}