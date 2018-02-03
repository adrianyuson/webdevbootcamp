var faker = require('faker');

var randomProduct;
var randomProductAdj;
var randomProductMat;
var price;

console.log('- - - Product List - - -');

for (var i = 0; i < 10; i++) {
    randomProduct = faker.commerce.product();
    randomProductAdj = faker.commerce.productAdjective();
    randomProductMat = faker.commerce.productMaterial();
    price = faker.commerce.price();
    
    console.log(randomProduct + " " + randomProductAdj + " " + randomProductMat + " = $" + price);
}