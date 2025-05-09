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

const dashboardRoutes = require('./routes/dashboardData.route');
app.use('/api/dashboard', dashboardRoutes);

const formDataRoutes = require('./routes/formData.route');
app.use('/api/formData', formDataRoutes);

const fileRoutes = require('./routes/files.route');
app.use('/api/files',fileRoutes);

app.get("/", (req, res) => {
    res.send("✅ Backend is running and ready!");
  });

// Error handling middleware
// const errorHandler = require('./middlewares/errorHandler');
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
