const Pool = require('pg').Pool
const pool = new Pool({
  user: 'charlie',
  host: 'localhost',
  database: 'cantimagine',
  port: 5432
})


/*
 * Items
 */
const getItems = (request, response) => {
  pool.query('SELECT * FROM art_items ORDER BY completed_on', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getItemByCloudinaryId = (request, response) => {
  const publicId = request.params.publicId

  pool.query('SELECT * FROM art_items WHERE public_id = $1', [publicId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const createItem = (request, response) => {
  const { publicId, originalPrice, title, description, subjLocation, completedOn, medium, size } = request.body
  const sql = 'INSERT INTO art_items (public_id, original_price, title, description, subj_location, completed_on, medium, size) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'

  pool.query(sql, [publicId, originalPrice, title, description, subjLocation, completedOn, medium, size], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Item added with ID: ${result.insertId}`)
  })
  
}

const updateItem = (request, response) => {
  const { artId, publicId, originalPrice, title, description, subjLocation, completedOn, medium, size } = request.body
  const sql = 'UPDATE art_items SET public_id = $1, original_price = $2, title = $3, description = $4, subj_location = $5, completed_on = $6, medium = $7, size = $8 WHERE art_id = $9'
  pool.query(sql, [publicId, originalPrice, title, description, subjLocation, completedOn, medium, size, artId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Item updated with ID: ${artId}`)
  })
}



/*
 * Products
 */

const getProductsByArtId = (request, response) => {
  const artId = parseInt(request.params.id)

  pool.query('SELECT product_type, product_id FROM art_products WHERE art_id = $1', [artId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProductById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM art_products WHERE entry_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createProduct = (request, response) => {
  const { artId, productType, productId } = request.body

  pool.query('INSERT INTO art_products (art_id, product_type, product_id) VALUES ($1, $2, $3)', [artId, productType, productId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Product added with ID: ${result.insertId}`)
  })
}


const updateProduct = (request, response) => {
  const { id, artId, productType, productId } = request.body
  const sql = 'UPDATE art_products SET art_id = $1, product_type = $2, product_id = $3 WHERE entry_id = $4'
  pool.query(sql, [artId, productType, productId, id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Product updated with ID: ${id}`)
  })
}




 /**
  * Photos
  */

 const getProcessPhotosByArtId = (request, response) => {
  const artId = parseInt(request.params.id)

  pool.query('SELECT public_id, order_num FROM process_photos WHERE art_id = $1', [artId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPhotoById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM process_photos WHERE photo_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}



const createProcessPhoto = (request, response) => {
  const { artId, publicId, orderNum } = request.body
  const sql = 'INSERT INTO process_photos (public_id, art_id, order_num) VALUES ($1, $2, $3)'
  pool.query(sql, [publicId, artId, orderNum], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Photo added with ID: ${result.insertId}`)
  })
}

const updateProcessPhoto = (request, response) => {
  const { id, artId, publicId, orderNum } = request.body
  const sql = 'UPDATE process_photos SET public_id = $1, art_id = $2, order_num = $3 WHERE photo_id = $4'
  pool.query(sql, [publicId, artId, orderNum, id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Photo updated with ID: ${id}`)
  })
}




module.exports = {
  getItems,
  getItemByCloudinaryId,
  createItem,
  updateItem,
  getProductById,
  getProductsByArtId,
  createProduct,
  updateProduct,
  getPhotoById,
  getProcessPhotosByArtId,
  createProcessPhoto,
  updateProcessPhoto
}
