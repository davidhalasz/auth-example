
const login = (req, res, next) => {
    const {email, password} = req.body;
    console.log(`${email} and ${password}`);
    res.status(200).json({email: email, password: password});
}

module.exports = {
    login
}