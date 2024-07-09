const User = require('@/models/user')


const createUser = async (id) => await new User({ id }).save()

const getUser = async (id) => await User.findOne({ id }).select('-_id -__v')

const updataUser = async (id, setData) => await User.findOneAndUpdate({ id }, { $set: setData })

module.exports = {
    createUser,
    getUser,
    updataUser
};
