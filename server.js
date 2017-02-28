var express = require('express');
var app     = express();
var bodyParser = require('body-parser');
var PORT    = process.env.PORT || 3000;

var products = [
  {
    id: 1,
    name : 'Apple'
  },
  {
    id:2,
    name: 'Orange'
  }
];
var currentId = 2;

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/products', function(req,res) {
  res.send({products: products});
});

app.post('/products', function(req,res) {
  var productName = req.body.name;
  if (req.body.name == null || req.body.name == '') {
    res.json({success: false, message: 'input required'});
  }else {
    res.json({success:true})
    currentId++;
    products.push ({
      id: currentId,
      name: productName
    });
  }
});

app.put('/products/:id', function(req,res) {
  var id = req.params.id;
  var newName = req.body.newName;

  var found = false;

  products.forEach(function(product, index) {
    if (!found && product.id === Number(id)) {
      product.name = newName;
    }
  });
  res.send('UPDATE success');
});

app.delete('/products/:id',function(req,res) {
  var id = req.params.id;

  var found = false;
  products.forEach(function(product, index) {
    if (!found && product.id === Number(id)) {
      products.splice(index,1);
    }
  });
  res.send('delete success');
});
app.listen(PORT, function() {
  console.log('running on server' + PORT);
});
