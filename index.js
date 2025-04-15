const express = require('express');
const cors = require('cors');
//const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/users.route');
app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
    res.send("✅ Backend is running and ready!");
  });

// Error handling middleware
// const errorHandler = require('./middlewares/errorHandler');
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
