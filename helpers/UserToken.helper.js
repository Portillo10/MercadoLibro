
const validateUserJWT = async (user) => {
  if (!user) return res.status(401).json({msg:'Required Token'})
}

module.exports = validateUserJWT