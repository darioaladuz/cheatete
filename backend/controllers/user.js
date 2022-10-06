require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAll = async (req, res, next) => {
    const users = await User
        .find({})
    return res.status(200).json(users);
}

exports.register = async (req, res, next) => {
    const { username, password, password2 } = req.body;

    const alreadyExists = await User.findOne({ username });

    if(alreadyExists){
        return res.status(403).json({
            message: 'This email is already registered.'
        })
    }

    if(password !== password2){
        return res.status(403).json({
            message: 'Passwords do not match!'
        })
    }

    const hashRounds = 10;
    const passwordHash = await bcrypt.hash(password, hashRounds);

    const user = new User({
        username,
        passwordHash,
    });

    try {
        const newUser = await user.save();
        return res.status(201).json(newUser);
    } catch(error) {
        console.error(error);
        return res.status(400).json({
            message: 'There was an error'
        })
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    if(username === '' || password === ''){
        return res.status(400).json({
            message: 'Username or password fields cannot be empty'
        })
    }

    const user = await User
        .findOne({ username })


    if(!user){
        return res.status(403).json({
            message: 'User not found'
        })
    }

    const comparePasswords = await bcrypt.compare(password, user.passwordHash);

    if(!comparePasswords){
        return res.status(403).json({
            message: 'Incorrect password. Try again'
        })
    }

    const userForToken = { username: user.username, id: user._id }

    const token = jwt.sign(userForToken, process.env.SECRET);


    return res.status(200).json({
        username,
        token
    })
}

// exports.addFriend = async (req, res, next) => {
//     const friend = await User.findById(req.params.id).populate('friends').populate('friendRequests');
    
//     const decodedToken = jwt.verify(req.token, process.env.SECRET);
//     if(!decodedToken.id){
//       return res.status(401).json({
//         error: 'token missing or invalid'
//       })
//     }

//     const user = await User.findById(decodedToken.id).populate('friends').populate('friendRequests');

//     if(!user) {
//         return res.status(401).json({
//             message: 'you must log in in order to add a friend'
//         })
//     }

//     /**
     
//      * else add sentrequest on user and received on friend
//      * 
//      */

//     // * if they are already in my friends list, throw error
//     if(user.friends.find(f => f._id.toString() === friend._id.toString())){
//         return res.status(400).json({
//             message: 'This user is already in your friend list'
//         })
//     }

//     //* if I already sent FR, throw error
    
//     if(user.sentRequests.find(f => f._id.toString() === friend._id.toString())){
//         return res.status(400).json({
//             message: 'You already sent this user a friend request'
//         })
//     }

//     if(!user.friendRequests.find(f => f._id.toString() === friend._id.toString()) && !user.sentRequests.find(f => f._id.toString() === friend._id.toString())){
//         friend.friendRequests = friend.friendRequests.concat(user._id);
//         user.sentRequests = user.sentRequests.concat(friend._id);
//         await User.findByIdAndUpdate(friend._id, friend);
//         await User.findByIdAndUpdate(user._id, user);
//         return res.status(200).json({
//             friend, user
//         })
//     }

//     //* * if they sent me FR, add them as a friend

//     // if(user.friends.find(f => f._id === friend._id)){
//     //     console.log('works');
//     //     return res.status(400).json({
//     //         message: 'This person is already your friend!'
//     //     })
//     // } else {
//     //     console.log({f});
//     // }
//     // let = friendRemoveReceived = friend;
//     // let friendRemoveSent = friend;
//     // let userRemoveReceived = user;
//     // let userRemoveSent = user;

//     // if(friend.friendRequests){
//     //     friendRemoveReceived = friend.friendRequests.filter(f => f._id.toString() !== user._id.toString());
//     // }
//     // if(friend.sentRequests){
//     //     friendRemoveSent = friendRemoveReceived.sentRequests.filter(f => f._id.toString() !== user._id.toString());
//     // }
//     // if(user.friendRequests){
//     //     userRemoveReceived = user.friendRequests.filter(f => f._id.toString() !== user._id.toString());
//     // }
//     // if(user.sentRequests){
//     //     userRemoveSent = userRemoveReceived.sentRequests.filter(f => f._id.toString() !== user._id.toString());

//     // }

    
//     friend.friendRequests = friend.friendRequests.filter(f => f._id.toString() !== user._id.toString());
//     friend.sentRequests = friend.sentRequests.filter(f => f._id.toString() !== user._id.toString());
//     friend.friends = friend.friends.concat(user._id);

//     user.friendRequests = user.friendRequests.filter(f => f._id.toString() !== friend._id.toString());
//     user.sentRequests = user.sentRequests.filter(f => f._id.toString() !== friend._id.toString());
//     user.friends = user.friends.concat(friend._id);
//     await User.findByIdAndUpdate(user._id, user);
//     await User.findByIdAndUpdate(friend._id, friend);

//     // if(user.friendRequests.find(f => f._id === friend._id)){

//     // }

//     return res.status(200).json({
//         friend,
//         user
//     })
// }

// exports.resetFriends = async (req, res, next) => {
//     const result = await User.updateMany({}, {
//         $unset: {
//             friends: "",
//             friendRequests: "",
//             sentRequests: ""
//         }
//     })

//     return res.status(200).json(result);
// }