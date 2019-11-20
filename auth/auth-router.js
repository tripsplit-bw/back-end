const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');

router.get('/', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ message: 'Error fetching users!' });
    });
});

router.post('/register', (req, res) => {
	let { username, password, email } = req.body;

	if (username && password && email) {
		let user = req.body;
		const hash = bcrypt.hashSync(user.password, 6);

		user.password = hash;
		user.username = user.username.toLowerCase();

		Users.register(user)
			.then(addsUser => {
				res.status(201).json(addsUser);
			})
			.catch(err => {
				res.send(err);
			});
	} else {
		res.status(500).json({
			message: 'username, password, and email required!'
		});
	}
});


router.post('/login', (req, res) => {
	let { username, password } = req.body;
	if (username && password) {
		username = username.toLowerCase();
		Users.findBy({ username })
			.first()
			.then(user => {
				if (user && bcrypt.compareSync(password, user.password)) {
					const token = tokenService.generateToken(user);
					res.status(200).json({
						message: `Welcome, ${user.username}`,
						token
					});

				} else {
					res
						.status(401)
						.json({ message: 'invalid credentials' });
				}
			})
			.catch(err => {
				res.status(500).json(err);
			});
	} else {
		res
			.status(500)
			.json({ message: 'missing username or password' });
	}
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res
                    .status(500)
                    .json({
                        message:
                            'log out as needed'
                    });
            } else {
                res.status(200).json({ message: 'logged out successfully' });
            }
        });
    } else {
        res.status(200).json({ message: 'take care' });
    }
});


function getJwt(username) {
    const payload = {
        username
    };

    const secret = process.env.JWT_SECRET || 'is it secret, is it safe?';

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, secret, options);
}

function validateUser(user) {
    let errors = [];

    if (!user.username || user.username.length < 2) {
        errors.push('Please include a username with at least 2 characters');
    }

    if (!user.password || user.password.length < 6) {
        errors.push('Please include a password with at least 6 characters');
    }

    return {
        isSuccessful: errors.length > 0 ? false : true,
        errors
    };
}

module.exports = router;
