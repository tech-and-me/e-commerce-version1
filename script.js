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

// *************************** Global Variable *************************

let basket = [];
// let totalAmount = 0;

// ******************************* Functions *****************************
const renderProductList = (productArray) => {
    let htmlElements="";
    productArray.forEach(obj => {
    htmlElements += `
                <div class= "col col-12 col-sm-6 col-md-4 col-lg-3 gy-5 card-item text-center">
                <div class="card">
                    <img src=${obj.productImg} class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${obj.productName}</h5>
                    <p class="card-text px-2 fw-bold"><span>AUD  </span>${obj.unitPrice}</p>
                    <hr>
                        <div class="d-inline-flex align-items-center">
                            <label for="quantiy" class="me-2 w-75">Quantity</label>
                            <input type="number" name="quantity" min="1" class="form-control quantity w-50" />
                        </div>
                    </div>  
                </div>
            </div>
        ` 
    })
    
    document.getElementById("productsDisplaySection").innerHTML = htmlElements;
}

// ***********************Handle when added to basket clicked ***********************
// const uniqueBasket = [...new Set()];

const handleAddToBasket = () => {

   
    //  1. Adding products to basket
    const quantityElms = document.querySelectorAll(".quantity");
    quantityElms.forEach((qtyElm,index) => {    
        // any product card that quantity is not empty, we will do the following.  
        if (qtyElm.value >0){
            // Grab all info of the product and add it to a new object
                let obj = {
                    productID: productArray[index].productID,
                    productName:productArray[index].productName,
                    productQuantity:+qtyElm.value,
                    unitPrice : +productArray[index].unitPrice,
                    amount : 0
                }
            
            // If the basket is empty, push the new object to the basket
                if(basket.length===0){
                    basket.push(obj);
                }
                
            // if the basket is not empty, need to check first if the item already exist before pushing the new object    
                else{
                    let found = false;  // at this stage, assume that it is not found
                    // and then goes through the whole basket if contain item with the same name
                    // if it is, then update the found value to true and the increase the quality as well
                    basket.forEach(basketItem => {
                        if(basketItem.productName === obj.productName){
                            found = true;
                            basketItem.productQuantity += +qtyElm.value;
                        }
                    });

                    // if after run through whole loop of basket and still not found, then push the object to the basket
                    if (!found){
                        basket.push(obj);
                    }
                }

            } // end of if qty is greater than zero
        });  // end of looping the whole card


// 4. invoke render function
    renderOrderDetails(); 

// 5.clear form
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(element => {
        element.value = null;   
    });

}



// ***********************Render order details***********************
const renderOrderDetails = () => {
    // Note: I choose to include calculate amount codes here so that everytime this method is called, the amount would be updated even when delete or edit products. 
     



    //  1. calculate total amount of each product ordered 
    basket.map((basketObj,index)=>{
        basketObj.amount = basketObj.productQuantity * basketObj.unitPrice;
        
    })

    // 2. calculate total amount of the whole basket    
    let totalAmount = 0;  // reset total amount back to zero before doing any calculation
    basket.forEach(basketObj => {
        totalAmount += basketObj.amount; 
    });

    // 3. Generate html elements to render to order details section
    let productsOrderedHtml = "";
    basket.forEach((basketObj,index) => {
        productsOrderedHtml +=    
                `
                    <tr id="${basketObj.id}">
                        <td class="align-middle">${basketObj.productName.split(" ")[0]}</td>
                        <td class="align-middle">${basketObj.productQuantity}</td>
                        <td class="align-middle right"><span>AUD </span>${(basketObj.unitPrice).toLocaleString('en-US')}</td>
                        <td class="align-middle"><span>AUD </span>${(basketObj.amount).toLocaleString('en-US')}</td>
                        <td colspan="2" class="align-middle">
                            <span class="text-danger remove px-2 " onclick="deleteProductOrdered(${index})">
                            <i class="fa-solid fa-trash-can "></i>
                            </span>
                            <span class="text-danger edit px-2" onclick="editProductOrdered(${index})" ><i class="fa-solid fa-pencil"></i></span>                
                        </td>
                    </tr>
                `         
    });

    //4. render order details 
    document.getElementById("tbody").innerHTML = productsOrderedHtml;
    document.getElementById("total").innerHTML = totalAmount.toLocaleString('en-US');
}

// ***********************Handle when product deleted***********************
// note: code for invoke this function is attached with OnClick 
const deleteProductOrdered = (index) => {
    basket.splice(index,1);
    renderOrderDetails();
}

// ***********************Handle when product edited***********************
// note: code for invoke this function is attached with OnClick 
const editProductOrdered = (index) => {
    let qty = prompt("Enter the new qty here: ");
    qty = Number(qty);
    if (qty >=1){
        basket[index].productQuantity = qty;
    renderOrderDetails();
    }else{
        alert("Qty cannot be lessor than 1. Pls try again.")
        editProductOrdered(index);
    }    
} 

// ******************************Invoke Functions *****************************

// render product array when page loaded 
renderProductList(productArray);



