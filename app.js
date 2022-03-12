const express = require('express')
const path = require('path')
const app = express()
const port = process.env.port || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.listen(port, () => console.log(`Node Array Diff Table server listening on port ${port}`))
