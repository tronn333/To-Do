const { Router } = require("express");
const User = require("../models/user");
const router = Router()
const jwt = require('jsonwebtoken');



const secretkey = 'secret key'

function generateAccessToken(user) {
  return jwt.sign(user, secretkey)
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, secretkey, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

router.post('/user', authenticateToken, async (req, res) => {
  res.json(req.user._doc)
})

router.post('/test', authenticateToken, (req, res) => {
  const gg = { result: 'poluchilos' }
  res.json(gg)
})


router.route('/signin')
  .post(async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body
    if (email && password) {
      const currentUser = await User.findOne({ email })
      if (currentUser.password === password) {
        const tokenUser = { ...currentUser }
        const accessToken = generateAccessToken(tokenUser)
        return res.json({ accessToken: accessToken, name: currentUser.name, points: currentUser.points })
      }
      return res.sendStatus(401);
    }
    return res.sendstatus(403)
  })




router.route('/signup')
  .post(async (req, res) => {
    console.log(req.body);
    try {
      const name = req.body.name
      const email = req.body.email
      const password = req.body.password
      if (email && password && name) {
        const newUser = await User.create({ email: email, password: password, name: name })
        const tokenUser = { ...newUser }
        console.log(tokenUser);
        const accessToken = generateAccessToken(tokenUser)
        return res.json({ accessToken: accessToken })
      }
      return res.sendStatus(401)

    } catch (error) {
      console.log(error);
      return res.sendStatus(403)
    }
  })


module.exports = router