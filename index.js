const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'CantImagineWhy backend API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})

app.get('/items', db.getItems)
app.get('/item/:publicId', db.getItemByCloudinaryId)
app.post('/items', db.createItem)
app.put('/items/:artId', db.updateItem)

app.get('/products/:artId', db.getProductsByArtId)
app.get('/product/:id', db.getProductById)
app.post('/products', db.createProduct)
app.put('/products/:id', db.updateProduct)

app.get('/photos/:artId', db.getProcessPhotosByArtId)
app.get('/photo/:id', db.getPhotoById)
app.post('/photos', db.createProcessPhoto)
app.put('/photos/:id', db.updateProcessPhoto)
