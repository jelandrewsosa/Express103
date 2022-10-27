export default function FindUserValidator(req, res, next) {
  const users = req.requestUsersInfo;
  const userId = req.params.userId;
  const findUser = users.find((user) => user.id === parseInt(userId));

  if(!findUser) {

    return res.status(404).json({
      error: "User Not Found"
    });
  }
  next();
}