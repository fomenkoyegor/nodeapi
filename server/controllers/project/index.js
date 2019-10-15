const {Project} = require('../../models');
const errHendler = require('../../untils/errHendler');
const {Validator} = require('node-input-validator');


const get = async (req, res) => {
  try {
    const user = req.user.id;
    const projects = await Project.find({user});
    res.status(200).json(projects);
  } catch (err) {
    errHendler(res, err);
  }
};


const create = async (req, res) => {
  try {
    const user = req.user.id;
    const {name} = req.body;
    const v = new Validator({name}, {
      name: 'required|minLength:2|maxLength:12'
    });

    v.check().then((matched) => {
      if (!matched) {
        res.status(422).send(v.errors);
      }
    });
    const project = new Project({name, user});
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    errHendler(res, err);
  }
};


const remove = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = req.user.id;
    const project = await Project.find({_id, user});
    if (project) await Project.remove({_id});
    res.status(201).json(project);
  } catch (e) {
    errHendler(res, e)
  }
};

const id = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = req.user.id;
    const project = await Project.find({_id, user});
    res.status(201).json(project);
  } catch (e) {
    errHendler(res, e)
  }
};

const update = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = req.user.id;
    let project = await Project.find({_id, user});

    const v = new Validator(req.body, {
      name: 'required|minLength:2|maxLength:12'
    });

    v.check().then((matched) => {
      if (!matched) {
        res.status(422).send(v.errors);
      }
    });

    if (project) {
      project = await Project.findByIdAndUpdate(
        {_id},
        {$set: req.body},
        {new: true}
      );
    }
    res.status(201).json(project);
  } catch (e) {
    errHendler(res, e)
  }
};


module.exports = {get, create, remove, id, update};


