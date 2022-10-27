export default function CheckIfValidEmail(req, res, next) {
  const {email} = req.body;

  if (!email.includes("@")) {

    return res.status(422).json({
      error: "Cannot Create Account, Email Address is Invalid",
    });
  }
  next();
}

