import express from 'express';

// Create Express server
const app = express();

// Define port to be used
app.set('port', process.env.PORT || 3001);

// Use json
app.use(express.json());

// Use routers
app.get('/test', (request, response) => {
  return response.json({ message: 'Hi!' });
});

export default app;
