export default function login(req) {
  console.log('login action from the api');
  const user = {
    name: req.body.name
  };
  req.session.user = user;
  return Promise.resolve(user);
}
