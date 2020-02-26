var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCompany = document.getElementById("productCompany");
var productDesc = document.getElementById("productDesc");
var myBtn = document.getElementById("myBtn");
var search = document.getElementById("search");
var currentIndex = 0;
var products = [];
var cut1 = "" ,cut2 = "" ,cut3 = "";

if(localStorage.getItem("products")==null)
    {
        products = [];
    }
else
    {
        products = JSON.parse(localStorage.getItem("products"));
        displayData();
    }

myBtn.onclick = function()
{
    if (myBtn.innerHTML == "add product")
        {addProduct();
         displayData();
         clearForm();
         if(search.value != "")
             searchResult();
        }
    else
        {
           products[currentIndex].name = productName.value; 
           products[currentIndex].price = productPrice.value; 
           products[currentIndex].company = productCompany.value; 
           products[currentIndex].desc = productDesc.value; 
            
            displayData();
            clearForm();
            myBtn.innerHTML = "add product";
            if(search.value != "")
                searchResult();
            localStorage.setItem("products",JSON.stringify(products));
        }
}

function addProduct()
{
    if(productName.value == "" || productPrice.value == "" || productCompany.value == "")
        alert('Please, compelete the data');
    else
    {var product ={name:productName.value,
                  price:productPrice.value,
                  company:productCompany.value,
                  desc:productDesc.value}
    products.push(product);
    localStorage.setItem("products",JSON.stringify(products));
    }
}

function displayData ()
{
    var temp = "";
    for(var i=0;i<products.length;i++)
        {
            temp += `<div class="col-md-6 col-lg-4 col-xl-3 product"><div class="layer"><h2 class="text-info">`+products[i].name+`</h2><h3 class="text-danger">`+products[i].price+`</h3>
                    <p class="text-dark">`+products[i].desc+`</p><h3 class="text-danger">`+products[i].company+`</h3>
                    <button class="btn btn-danger mr-2" onclick="deleteProduct(`+i+`)">Delete</button><button class="btn btn-info" onclick="updateProduct(`+i+`)">Update</button></div></div>`;
        }
    document.getElementById("rowData").innerHTML = temp;
}

function clearForm(){
    productName.value = "";
    productPrice.value = "";
    productCompany.value = "";
    productDesc.value = "";
}

function deleteProduct(i)
{
    products.splice(i,1);
    displayData();
    searchResult();
    search.value = "";
    localStorage.setItem("products",JSON.stringify(products));
}

function updateProduct(i)
{
    myBtn.innerHTML = "update product";
    productName.value = products[i].name;
    productPrice.value = products[i].price;
    productCompany.value = products[i].company;
    productDesc.value = products[i].desc;
    
    currentIndex = i;
    
    search.value = "";
    document.getElementById("rowSearch").innerHTML = "";
    
}

search.onkeyup = function()
{
    searchResult();
}

function searchResult ()
{
    var temp2 = "";

    for (var i=0;i<products.length;i++)
        {
            if(products[i].name.includes(search.value))
                {
                    cut2 = search.value;
                    for(var o=0;o<products[i].name.length;o++)
                        {
                            if(products[i].name.indexOf(cut2) == 0)
                                {
                                    cut3 = products[i].name.substring(cut2.length);
                                }
                            
                            else
                                {
                                    cut1 = products[i].name.substring(0,products[i].name.indexOf(cut2));
                                    cut3 = products[i].name.substring(products[i].name.indexOf(cut2)+cut2.length)
                                }
                        }
                    temp2 += `<div class="col-md-3 product "><div class="layer"><h2 class="light"><span>`+cut1+`</span><span class="cut">`+cut2+`</span><span>`+cut3+`</span></h2><h3 class="text-danger">`+products[i].price+`</h3>
                    <p class="text-dark">`+products[i].desc+`</p><h3 class="text-danger">`+products[i].company+`</h3>
                    <button class="btn btn-danger mr-2" onclick="deleteProduct(`+i+`)">Delete</button><button class="btn btn-info" onclick="updateProduct(`+i+`)">Update</button></div></div>`;
                        cut1 = "";
                        cut3 = "";
                } 
            
        }

    if(search.value == "")
        temp2 = "";

    
    document.getElementById("rowSearch").innerHTML = temp2;
}