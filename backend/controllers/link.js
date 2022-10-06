const Link = require('../models/link');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.getAll = async (req, res, next) => {
    const links = await Link.find({});
    return res.status(200).json(links);
}

exports.add = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if(!decodedToken.id){
      return res.status(401).json({
        error: 'token missing or invalid'
      })
    }

    const user = await User.findById(decodedToken.id);

    if(!user) {
        return res.status(401).json({
            message: 'you must log in in order to add a friend'
        })
    }

    const { title, url } = req.body;

    if(title === '' || url === ''){
        return res.status(403).json({
            message: 'Fields cannot be empty'
        })
    }

    const link = new Link({
        title,
        url
    })

    try {
        const newLink = await link.save();
        return res.status(201).json(newLink);
    } catch(error) {
        console.error(error);
        return res.status(400).json({
            message: 'There was an error'
        })
    }
}

exports.del = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if(!decodedToken.id){
      return res.status(401).json({
        error: 'token missing or invalid'
      })
    }

    const user = await User.findById(decodedToken.id);

    if(!user) {
        return res.status(401).json({
            message: 'you must log in in order to add a friend'
        })
    }

    const id = req.params.id;

    try {
        await Link.findByIdAndRemove(id);
        return res.status(204).json({ message: 'Item deleted successfully' });
    } catch(error) {
        console.error(error);
        return res.status(400).json({
            message: 'There was an error'
        })
    }
}

exports.update = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if(!decodedToken.id){
      return res.status(401).json({
        error: 'token missing or invalid'
      })
    }

    const user = await User.findById(decodedToken.id);

    if(!user) {
        return res.status(401).json({
            message: 'you must log in in order to add a friend'
        })
    }

    const id = req.params.id;

    const { title, url } = req.body;

    const link = {
        title,
        url
    }

    try {
        const updatedLink = await Link.findByIdAndUpdate(id, link);
        return res.status(200).json({...link, id});
    } catch(error) {
        console.error(error);
        return res.status(400).json({
            message: 'There was an error'
        })
    }
}