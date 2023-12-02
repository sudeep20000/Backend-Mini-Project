const express = require('express');
const app = express();

const getServerState = () => {
  return 'active';
};

let users = [];

app.get('/', (req, res) => {
  res.send('Hello,this is my express server');
});

app.get('/health', (req, res) => {
  const serverName = 'Weeklist Server';
  const currentTime = new Date().toLocaleString();
  const serverState = getServerState();

  const healthInfo = {
    serverName,
    currentTime,
    serverState,
  };

  res.json(healthInfo);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  return res.status(200).json({ message: 'Login successful', user });
});

app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;

  const newUser = { username, password, email };
  users.push(newUser);

  return res
    .status(201)
    .json({ message: 'User created successfully', user: newUser });
});

app.use((req, res) => {
  res.status(404).send('Route not Found');
});

app.listen(5000, () => {
  console.log('server running on http://localhost:5000');
});
