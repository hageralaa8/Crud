//a3rf el variables bra el function 1- performance a7sn
var productNameInput = document.getElementById("productName"); // .value (kda empty string mafish value asln data awel m bft7 el saf7a)
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var productsContainerElement = document.getElementById("productsContainerElement")
var addProductButton = document.getElementById("addProductButton")
var UpdateProductButton = document.getElementById("UpdateProductButton")
var updateProductIndex;

// console.log(productNameInput) ,console.log(productPriceInput),console.log(productCategoryInput),console.log(productDescriptionInput), console.log(productImageInput) (3ashan at2kd ani tab3ahom s7)

var productsList = []  //empty array

//regex
var productNameRegex = /^[A-Z][a-z].+$/; //start 7arf capital + 7arf small
var productPriceRegex =/^\d+$/;//match ay rakm +
var productCategoryRegex =/^Mobile| TV| Labtop |Camera |Screens |Electronics$/;
var categoryDefualtOption=document.getElementById("categoryDefualtOption");
var productDescriptionRegex =/^.{5,}$/; //3la el a2al 5 7orof


if (localStorage.getItem("ourProducts") != null) {
  //old data
  productsList = JSON.parse(localStorage.getItem("ourProducts"))//array of object
  // console.log(productsList);
  displayProducts(productsList);
}

/*
AND(&&) short circuit --->call el function l7d m yla2y awel false w yo2f msh hatro7 takml el ba2y (solution &-->call all function cheak 3la kolo->  hizher lya kol el erorr el mawoda msh wa7da bs)
OR(||) short circuit
*/
function addProduct() //badif el product 3ande fe system
{
  if (isValidProductField( productNameRegex,productNameInput)&
  isValidProductField(productPriceRegex,productPriceInput)&
  isValidProductField(productCategoryRegex,productCategoryInput)&
  isValidProductField(productDescriptionRegex,productDescriptionInput)&
  isValidProductIamage()  ) //object ha5zn feh el ma3lomat eli haktnha
{
  var product =
  {
    productName: productNameInput.value, //"iphone" bas7b el data eli ana katbaha mogrd mbdos 3la  button(addProduct)
    productPrice: productPriceInput.value,
    productCategory: productCategoryInput.value,
    productDescription: productDescriptionInput.value,
    productImage: productImageInput.files[0].name // {0:{name},length:1}   key number msh ha3rf axis b . but [] 
  }
 
  productsList.push(product); //push -->add product
  localStorage.setItem(/*key*/"ourProducts", /*value array kolha fe sora string*/JSON.stringify(productsList));
  resetProductsInputs(); //ama ados 3l button ya3ml reset ll bainat w ya5liha null
  displayProducts(productsList);
  // console.log(productsList); // yatb3 array
  //console.log(Product.productImage); //yatb3 name el img
  //console.log("PRODUCTS: ",Product);
}

};

function resetProductsInputs() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = "Choose Your Category ";
  productDescriptionInput.value = null;
  productImageInput.value = null;
  //3ashn b3d m click 3la add product ashil 3alamt s7 w ykon el input random
  productNameInput.classList.remove("is-valid" ,"is-invalid");
  productPriceInput.classList.remove("is-valid" ,"is-invalid");
  productCategoryInput.classList.remove("is-valid" ,"is-invalid");
  productDescriptionInput.classList.remove("is-valid" ,"is-invalid");

}

function displayProducts(arr)//a3rd el data 3la elshasha
{
  var containerElement = "";
  for (var i = 0; i < arr.length; i++) {
    containerElement += `<div class="col">
        <div class="border shadow-sm p-2">
          <div class="product-image-container mb-5">
            <img src="./images/${arr[i].productImage}" class="w-100 h-100 object-fit-contain" alt="">
          </div>
          <h2 class="fs-5">${arr[i].productName}</h2>
          <p class="text-secondary fs-6">${arr[i].productDescription}</p>
          <p><span class="fw-semibold">Category:</span> ${arr[i].productCategory}</p>
          <div class="d-flex justify-content-between pe-3">
            <p class="fw-semibold">${arr[i].productPrice} EGP</p>
            <div class="icons">
              <i onclick="deleteProduct(${i})" class="fa-solid fa-trash text-danger fs-5"></i>
              <i onclick=" moveProductDetailsToInputs(${i})" class="fa-solid fa-pen-to-square text-success fs-5"></i>
            </div>
          </div>
        </div>
      </div>`;
  }
  productsContainerElement.innerHTML = containerElement;
}
//parameter -->haga mot8ira
function deleteProduct(deletedIndex) {
  productsList.splice(deletedIndex, 1);
  localStorage.setItem("ourProducts", JSON.stringify(productsList)); //shart 3ashn a5zn data fe localstorage tkon fe sort string
  displayProducts(productsList);
  console.log(productsList);
}
//string===> method (toLowerCase,...) { return New string but not update}
function searchByProductName(term) {
  var filteredProducts = []
  for (var i = 0; i < productsList.length; i++) {
    if (productsList[i].productName.toLowerCase().includes(term.toLowerCase()) == true) {
      filteredProducts.push(productsList[i])
    }
    console.log(filteredProducts);
    displayProducts(filteredProducts);

  }
}
/*1-awel click 3la icone(updatee) 3aiza el data tatrf3 fo2 w button ykon updateproduct
2-classlist===> batrg3ly array feha kol el classes bta3tyyy / methods--->1- add 2- remove 3- replace 4-toggles 5-contines
*/

function moveProductDetailsToInputs(index)//ma7tag a3rf el index
{
  productNameInput.value = productsList[index].productName
  productPriceInput.value = productsList[index].productPrice
  productCategoryInput.value = productsList[index].productCategory
  productDescriptionInput.value = productsList[index].productDescription
  addProductButton.classList.replace("d-block", "d-none")
  UpdateProductButton.classList.replace("d-none", "d-block")

  updateProductIndex = index;
}

function updateProduct() {
  if (isValidProductField( productNameRegex,productNameInput)&&
  isValidProductField(productPriceRegex,productPriceInput)&&
  isValidProductField(productCategoryRegex,productCategoryInput)&&
  isValidProductField(productDescriptionRegex,productDescriptionInput)&&
  isValidProductIamage()) //object ha5zn feh el ma3lomat eli haktnha
{
  productsList[updateProductIndex].productName = productNameInput.value;
  productsList[updateProductIndex].productPrice = productPriceInput.value;
  productsList[updateProductIndex].productCategory = productCategoryInput.value;
  productsList[updateProductIndex].productDescription = productDescriptionInput.value;

  console.log(productImageInput.files);

  if (productImageInput.files.length != 0) {
    productsList[updateProductIndex].productImage = productImageInput.files[0].name;
  }

  displayProducts(productsList);
  localStorage.setItem("ourProducts", JSON.stringify(productsList));
  console.log(productsList);
  resetProductsInputs()
  addProductButton.classList.replace("d-none", "d-block")
  UpdateProductButton.classList.replace("d-block", "d-none")
}};
//validate
//.test --->true / false
function isValidProductField(regex, element) {
  {
    if (regex.test(element.value) == true) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      element.nextElementSibling.classList.replace("d-block" ,"d-none")
      return true;
    } else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      element.nextElementSibling.classList.replace("d-none" , "d-block")
      return false;
    }
  }
};
// message erorr image
function isValidProductIamage() {
  if(productImageInput.files.length != 0){
    productImageInput.nextElementSibling.classList.replace("d-block" ,"d-none")
    return true;

  }
  else{
    productImageInput.nextElementSibling.classList.replace("d-none" , "d-block")
    return false;

  }
}