const { Router } = require('express');
const { Station, Comment } = require('../models');
const { restrict } = require('../auth');

const stationsRouter = Router();

// gets all stations '/stations'
stationsRouter.get('/', async (req, res) => {
  try {
    const stations = await Station.findAll();
    res.json(stations)
  } catch(err) {
    console.error({error: e});
  }
});

// get a station by id '/stations/:id'
stationsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const station = await Station.findByPk(id);
    res.json(station)
  } catch(e) {
    console.error({error: e});
  }
})

// gets all comments by station id '/stations/:id/comments'
stationsRouter.get('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.findAll({
      where: {
        station_id: id
      }
    });
    res.json(comments);
  } catch(e) {
    console.error({error: e});
  }
});

// post a comment to a station
stationsRouter.post('/:id/user/:user_id/comments/new', async (req, res) => {
  try {
      const user = await User.findByPk(req.params.user_id)
      const station = await Station.findByPk(req.params.id)
      const newComment = await station.createComment(req.body);
      await newComment.setUser(user)
      res.json(newComment);
    } catch (e) {
      console.error({error: e});
    }
})

module.exports = stationsRouter
