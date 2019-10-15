const {Task, Project} = require('../../models');
const errHendler = require('../../untils/errHendler');
const {Validator} = require('node-input-validator');


const create = async (req, res) => {
  try {
    const user = req.user.id;
    const {name} = req.body;
    const project = req.query.project_id || null;
    const v = new Validator({name}, {
      name: 'required|minLength:2|maxLength:120'
    });

    v.check().then((matched) => {
      if (!matched) {
        res.status(422).send(v.errors);
      }
    });
    const task = new Task({name, user, project});
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    errHendler(res, err);
  }
};


const remove = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = req.user.id;
    const task = await Task.find({_id, user});
    if (task) {
      await Task.remove({_id});
    }
    res.status(201).json(task);
  } catch (e) {
    errHendler(res, e)
  }
};

const id = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = req.user.id;
    const task = await Task.find({_id, user});
    res.status(201).json(task);
  } catch (e) {
    errHendler(res, e)
  }
};

const update = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = req.user.id;
    let task = await Task.find({_id, user});
    if (task) {
      const {name, date, priority, status, project} = req.body;
      const v = new Validator({name, date, priority, status}, {
        name: 'required|minLength:2|maxLength:120',
        date: 'dateFormat:YYYY-MM-DD',
        priority: 'integer',
        status: 'boolean',
      });

      v.check().then((matched) => {
        if (!matched) {
          res.status(422).send(v.errors);
        }
      });

      const userProject = await Project({_id: project, user});
      if (userProject) {
        task = await Task.findByIdAndUpdate(
          {_id},
          {$set: req.body},
          {new: true}
        );
        res.status(201).json(task);
      }

    }

  } catch (e) {
    errHendler(res, e)
  }
};


const getAll = async (req, res) => {
  try {
    const user = req.user.id;
    const query = {
      user,
      project: null,
      task: null
    };
    const sort = {
      _id: -1,
      priority: -1
    };
    if (req.query.project_id) {
      const projectId = req.query.project_id;
      const project = await Project.find({user, project: projectId});
      if (project) query.project = projectId;
      if (project && req.query.task_id) {
        const taskId = req.query.task_id;
        const task = await Task.find({_id: taskId, project: query.project});
        res.status(200).json(task);
      }
    }


    const tasks = await Task.find(query).sort(sort);
    res.status(200).json(tasks);
  } catch (e) {
    errHendler(res, e)
  }
};


module.exports = {create, remove, id, update, getAll};

