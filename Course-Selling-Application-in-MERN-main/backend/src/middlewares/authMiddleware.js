const jwt = require("jsonwebtoken");
const adminSecret = process.env.ADMIN_SECRET;
const userSecret = process.env.USER_SECRET;

const adminAuthentication = (req , res , next) => {
  // Admin authentication middleware logic
  const authHeader = req.headers.authorization ;
  if(authHeader)
  {
    const token = authHeader.split(" ")[1] ;
    jwt.verify(token , adminSecret , (err , admin) => {
      if(err)
      {
        return res.sendStatus(403) ;
      }
      req.admin = admin ;
      next() ;
    })
  }
  else{
    res.sendStatus(401) ;
  }
};

const userAuthentication = (req , res , next) => {
  // User authentication middleware logic
  const authHeader = req.headers.authorization ;
  if(authHeader)
  {
    const token = authHeader.split(" ")[1] ;
    jwt.verify(token , userSecret , (err , user) => {
      if(err)
      {
        return res.sendStatus(403) ;
      }
      req.user = user ;
      next() ;
    })
  }
  else{
    res.sendStatus(401) ;
  }
};

module.exports = { adminAuthentication, userAuthentication };