const bcrypt = require('bcryptjs');
const jwr = require('jsonwebtoken');
const config = require('../../config');
const {jwtSecret} = config;
const key = jwtSecret;
const {User} = require('../../models');
const errHendler = require('../../untils/errHendler');

const { Validator } = require('node-input-validator');




const login = async (req, res) => {
  const {email, password} = req.body;
  const v = new Validator({email, password}, {
    email: 'required|email',
    password: 'required|minLength:6|maxLength:15'
  });

  v.check().then((matched) => {
    if (!matched) {
      res.status(422).send(v.errors);
    }
  });
  const candidate = await User.findOne({email});
  if (candidate) {
    const passwordRes = bcrypt.compareSync(password, candidate.password);
    if (passwordRes) {
      const token = jwr.sign({
        email: candidate.email,
        userId: candidate._id
      }, key, {expiresIn: 60 * 60});
      res.status(200).send({
        token: `Bearer ${token}`,
        user: {
          _id:candidate._id,
          email:candidate.email
        }
      });
    } else {
      res.status(401).send({status: 'fail', message: 'password is not consist'});
    }
  } else {
    res.status(404).send({status: 'fail', message: 'email not found'});
  }

};


const register = async (req, res) => {
  const {email, password} = req.body;
  const v = new Validator({email, password}, {
    email: 'required|email',
    password: 'required|minLength:6|maxLength:15'
  });

  v.check().then((matched) => {
    if (!matched) {
      res.status(422).send(v.errors);
    }
  });
  const candidate = await User.findOne({email});
  if (candidate) {
    res.status(409).send({
      status: 'fail',
      message: 'email is alredy consist'
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const user = new User({email, password: bcrypt.hashSync(password, salt)});
    try {
      user.save(async (err, user) => {
        if (err) {
          res.status(409).send({status: 'fail', err});
        } else {
          login(req, res);
        }
      });
    } catch (err) {
      errHendler(res, err);
    }

  }

};

const users = async (req, res) => res.send({users: await User.find()});


const auth = {users, login, register};

module.exports = auth;
