const User = require('../Models/User');
const generateToken = require('../Utils/generateToken');

exports.registerUser = async (req,res) => {
    const {username , email , password} = req.body;

    try{
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message : 'User already exists'});
        }
        const user = await User.create({username , email,password});
        res.status(201).json({
            _id : user._id,
            username : user.username,
            email:user.email,
            token : generateToken(user._id),
        });
        console.log(`Registration Successful for user : ${email}`);
    }catch(err){
        res.status(500).json({message : 'Server Error' , err});
    }

};

exports.loginUser = async (req,res) => {
    const {email , password} = req.body;

    try{
        const user = await User.findOne({email});
        if(user && (await user.matchPassword(password))){
            res.json({
                _id : user._id,
                username : user.username,
                email : user.email,
                token : generateToken(user._id),
            });
        }else{
            res.status(401).json({message : 'Invalid email or password'});
        }
        console.log(`Login successful for user : ${email}`);
    }catch(err){
        res.status(500).json({message : 'Server Error' , err});
    }
};


exports.getUserProfile = async (req,res) => {
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id:user._id,
            username : user.username,
            email:user.email,
        });
    }else{
        res.status(404).json({message : 'User not found'});

    };

};