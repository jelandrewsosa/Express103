export default function CheckIfValidQueryEmail(req, res, next) {
  const {email} = req.query;

  if(email === undefined) {
    
    return res.status(422).json({
      error: "Cannot Update Email, Please Input Email Address",
    });
  }

  if (!email.includes("@")) {

    return res.status(422).json({
      error: "Cannot Update Email, Email Address is Invalid",
    });
  }
  next();
}

