require('dotenv').config();
const pool = require('../dbconfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkIfUserExists = async (req) => {
    const { username } = req.body;
    const users = await pool.query('SELECT * FROM users');
    const result = users.rows;
    const user = result.find((user) => user.username === username);
    return user;
};

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body;
        const user = await checkIfUserExists(req);

        if (user) {
            res.json({
                code: 409,
                message: 'Account exists already',
            });
            return;
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('hashedPassword :>> ', hashedPassword);
            const queryString = 'INSERT INTO "users" (username, password) VALUES ($1,$2);';
            const dbResponse = await pool.query(queryString, [username, hashedPassword]);

            res.json({
                code: 200,
                message: 'inserted user correctly',
                data: dbResponse.rows[0],
            });
        } catch (e) {
            res.status(500).json({
                code: 500,
                message: 'Error trying to insert a new user',
            });
        }
    },

    login: async (req, res) => {
        const { password } = req.body;
        const user = await checkIfUserExists(req);

        if (user === undefined) {
            res.json({
                code: 404,
                message: 'Account does not exist',
            });
            return;
        }

        try {
            const passwordIsMatching = await bcrypt.compare(password, user.password);

            if (passwordIsMatching) {
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                res.send({ accessToken });
            } else {
                res.json({
                    code: 401,
                    message: 'Wrong Password',
                });
                return;
            }
        } catch (e) {
            res.status(500).send();
        }
    },
};
