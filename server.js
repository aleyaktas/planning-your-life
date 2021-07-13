const express = require('express');
const connectDB = require('./config/db')

const app = express();

connectDB()

app.use(express.json({extented: false}))

app.get('/', (req, res) => res.send('Api running'))

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/todo', require('./routes/api/todo'));
app.use('/api/auth', require('./routes/api/auth'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));