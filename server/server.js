const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const centerRoutes = require('./routes/centerRoutes');
const sportRoutes = require('./routes/sportRoutes');
const courtRoutes = require('./routes/courtRoutes'); // <- Make sure this is correct
const bookingRoutes = require('./routes/bookingRoutes');
const availabilityRoutes = require('./routes/availability'); // Adjust path as necessary
const bodyParser = require('body-parser');


dotenv.config();
connectDB();

const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running!');
  });
  

// Register routes
app.use('/api/users', userRoutes);
app.use('/api/centers', centerRoutes);
app.use('/api/sports', sportRoutes);
app.use('/api/courts', courtRoutes); // <- Make sure this path is exactly like this
app.use('/api/bookings', bookingRoutes);
app.use('/api/availability', availabilityRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
