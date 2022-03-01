
// ******************************Product Array *****************************
const productArray =[
    {
        productID: 1,
        productImg:"https://images.unsplash.com/photo-1561808843-7adeb9606939?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        productName:"Breezy My Heart",
        unitPrice:"300",
        
    },
    {
        productID: 2,
        productImg:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        productName:"Megatron The Ruler",
        unitPrice:"1200",
        
    },
    {
        productID: 3,
        productImg:"https://images.unsplash.com/photo-1583979365152-173a8f14181b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU3fHxzaG9lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        productName:"Bumblebee Forever",
        unitPrice:"800",
        
    },
    {
        productID: 4,
        productImg:"https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        productName:"How about Jazz ✌",
        unitPrice:"600",
        
    },
    {
        productID: 5,
        productImg:"https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU1fHxzaG9lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        productName:"Optimus Prime",
        unitPrice:"1500",
        
    },
    {
        productID: 6,
        productImg:"https://images.unsplash.com/photo-1600185365778-7875a359b924?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        productName:"Mud Flap Wow",
        unitPrice:"500",
        
    },
    {
        productID: 7,
        productImg:"https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQ2fHxzaG9lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        productName:"Hound the Sky",
        unitPrice:"600",
        
    },
    {
        productID: 8,
        productImg:"https://media.istockphoto.com/photos/fashion-white-sneakers-in-neon-light-sport-shoes-for-training-in-the-picture-id1301394040?b=1&k=20&m=1301394040&s=170667a&w=0&h=DM2FyLVbwZ-YjZeb5P8d45RgF2x_gTmT8kC66u7zIrk=",
        productName:"Drift Rule All",
        unitPrice:"2000",
        
    }
]

let basket = [];
let totalAmount = 0;

// ******************************Functions *****************************
const generateProductsHtml = (displayList) => {
    let htmlElements="";
    displayList.forEach(obj => {
    htmlElements += `
                <div class= "col col-12 col-sm-6 col-md-4 col-lg-3 gy-5 card-item text-center">
                <div class="card" id=${obj.productID}>
                    <img src=${obj.productImg} class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${obj.productName}</h5>
                    <p class="card-text px-2 fw-bold"><span>AUD  </span>${obj.unitPrice}</p>
                    <hr>
                        <div class="d-inline-flex align-items-center">
                            <label for="quantiy" class="me-2 w-75">Quantity</label>
                            <input type="number" name="quantity" min="1" class="form-control quantity w-25" />
                        </div>
                    </div>  
                </div>
            </div>
        ` 
    })
        return htmlElements;
    };

const renderProductList = (htmlElms) => {
    const displayElm = document.getElementById("productsDisplaySection");
    displayElm.innerHTML = htmlElms;
}

const handleAddToBasket = () => {
   const quantityElms = document.querySelectorAll(".quantity");

//  1. Adding products to basket
    quantityElms.forEach((qtyElm,index) => {
        
        if (qtyElm.value >0){
            let obj = {
                productID: productArray[index].productID,
                productName:productArray[index].productName,
                productQuantity:+qtyElm.value,
                productPrice : +productArray[index].unitPrice,
                amount : 0
            }
            basket.push(obj);
            
        } 
    });

//  2. convert products in basket to html elements
    const proOrderedHtml = generateProductOrderedHtml(basket);

//3. render order details
    renderOrderDetails(proOrderedHtml);     
// clear form

    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(element => {
        element.value = null;   
    });
}


const generateProductOrderedHtml = (basket) => {
    totalAmount = 0;
    // calculate total amount of each product
    basket.map((elm,index)=>{
        elm.amount = elm.productQuantity * elm.productPrice;
    })

    // calculate total amount for the whole basket
    basket.forEach(obj => {
        totalAmount += obj.amount; 
    });
    console.log("Total amount of order details is : " , totalAmount);


    let proOrderedHtml = "";
    basket.forEach((obj,index) => {
        proOrderedHtml +=    
                `
                    <tr id="${obj.id}">
                        <td>${obj.productName}</td>
                        <td>${obj.productQuantity}</td>
                        <td><span>$</span>${obj.productPrice}</td>
                        <td><span>$</span>${obj.amount}</td>
                        <td colspan="2">
                            <span class="text-danger remove px-2 " onclick="deleteProductOrdered(${index})">
                            <i class="fa-solid fa-trash-can "></i>
                            </span>
                            <span class="text-danger edit" onclick="editProductOrdered(${index})" ><i class="fa-solid fa-pencil"></i></span>                
                        </td>
                    </tr>
                `         
    });

    return proOrderedHtml;
}

const renderOrderDetails = (htmlElms) => {
    document.getElementById("tbody").innerHTML = htmlElms;
    document.getElementById("total").innerHTML = totalAmount;
}

const deleteProductOrdered = (index) => {
    basket.splice(index,1);
    renderOrderDetails(generateProductOrderedHtml(basket));
} 

const editProductOrdered = (index) => {
    let qty = prompt("Enter the new qty here: ");
    qty = Number(qty);
    if (qty >=1){
        basket[index].productQuantity = qty;
    renderOrderDetails(generateProductOrderedHtml(basket));
    }else{
        alert("Qty cannot be lessor than 1. Pls try again.")
        editProductOrdered(index);
    }
    
} 

// ******************************Invoke Functions *****************************

// render product array when page loaded 
const htmlElements = generateProductsHtml(productArray);
renderProductList(htmlElements);



