const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Static user list (for demonstration purposes)
const userList = [
  { id: 8, name: 'kabilan', stepCount: 7000 },
  { id: 5, name: 'udhaya', stepCount: 9000 },
  { id: 7, name: 'logesh', stepCount: 3000 },
  { id: 6, name: 'aslam', stepCount: 4000 },
];

// API to fetch step count of a user by ID
app.get('/api/user/:id/stepCount', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userList.find(user => user.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.json({ stepCount: user.stepCount });
});

// API to update step count of a user by ID
app.put('/api/user/:id/stepCount', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userList.find(user => user.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const newStepCount = req.body.stepCount;
  if (isNaN(newStepCount) || newStepCount < 0) {
    return res.status(400).json({ error: 'Invalid step count value' });
  }

  user.stepCount = newStepCount;
  return res.json({ message: 'Step count updated successfully', stepCount: user.stepCount });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});