const express = require('express');
const connectDB = require('./config/db')

const app = express();

connectDB()

app.use(express.json({extended: false}))

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/todo', require('./routes/api/todo'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/todolist', require('./routes/api/todolist'));


// Serve static assets in productıon
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));