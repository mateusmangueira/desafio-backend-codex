require('dotenv').config()
import app from './app';

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`)
});