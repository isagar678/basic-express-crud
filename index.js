const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 },
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/products', (req, res) => {
  const newProduct = req.body;
  if (!newProduct.id || !newProduct.name || !newProduct.price) {
    return res.status(400).json({ error: 'Invalid product data' });
  }
  products.push(newProduct);
  res.json({ message: 'Product added', product: newProduct });
});

app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  products = products.filter(product => product.id !== productId);
  res.json({ message: `Product with ID ${productId} deleted` });
});

app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  if (!updatedProduct.name || !updatedProduct.price) {
    return res.status(400).json({ error: 'Invalid product data' });
  }
  let product = products.find(product => product.id === productId);
  if (product) {
    product.name = updatedProduct.name;
    product.price = updatedProduct.price;
    res.json({ message: 'Product updated', product });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.patch('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updates = req.body;
    const productIndex = products.findIndex(product => product.id === productId);
  
    if (productIndex !== -1) {
      const oldProduct = products[productIndex];
      const updatedProduct = { id: oldProduct.id, ...oldProduct, ...updates };
      products[productIndex] = updatedProduct;
      res.json({ message: 'Product updated partially', product: updatedProduct });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });
  


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
