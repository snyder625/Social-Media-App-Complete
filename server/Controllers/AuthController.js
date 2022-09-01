import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//Register a new user
export const registerUser = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
    const {username} = req.body;

    const newUser = new UserModel(req.body);

    try{
        const oldUser = await UserModel.findOne({username});
        if(oldUser) {
            res.status(400).json("The Username is already taken")
        }
        const user = await newUser.save();
        const token = jwt.sign({
            username: user.username, id: user._id
        }, process.env.JWT_KEY, { expiresIn: '1h'})

        res.status(200).json({user, token});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

//Login User Controllers
export const loginUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await UserModel.findOne({username: username});

        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            if(!validity) {
                res.status(400).json("Wrong Password");
            }
            else {
                const token = jwt.sign({
                    username: user.username, id: user._id
                }, process.env.JWT_KEY, { expiresIn: '1h'})
                res.status(200).json({user, token});
            }
        }
        else {
            res.status(404).json("User does not exist");
        }
    }
    catch {
        res.status(500).json({message: err.message});
    }
}