
const Product = require("../models/product")



const getAllProducts = async(req, res) => {

    const {company , name,  featured , sort , select} = req.query       //req.query matlab api ke andr diya h hmae usme se usko ye bolte h(http://localhost:4000/api/products?company=apple&name=iphone
const queryObject = {}
if(company){
    queryObject.company = company;
    // console.log(queryObject)
}
if(featured){
        queryObject.featured = featured
}
if(name){
    // queryObject.name = name;
    queryObject.name = { $regex: name , $options: "i"};
}

let apiData = Product.find(queryObject);
if(sort){
    // sort use krte h ( sort=-price,-name 
    // let sortFix = sort.replace("," , " ")
    let sortFix = sort.split(",").join(" ")
    // queryObject.sort(sortFix);
    apiData = apiData.sort(sortFix)     // ye sorting k liye update kiya 
}

if(select){
    // select use krte h ( select=name,category
    // let selectFix = select.replace("," , " ")
    let selectFix = select.split(",").join(" ");
    // queryObject.select(sortFix);
    apiData = apiData.select(selectFix)     // ye selecting k liye update kiya 
}


// Page
let page = Number(req.query.page) || 1;
let limit = Number(req.query.limit) || 10;
let skip = (page -1) * limit
apiData = apiData.skip(skip).limit(limit);
// Page finidh

console.log(queryObject)
// in sabko object m dalne se ye sabna common output deta h jaise ek hi object m ye sari value honi chaiye vhi output dega if object m val insert use krte h then 

    // const mydata = await Product.find(req.query)
    // const mydata = await Product.find(queryObject).sort(sort)      //==
    const mydata = await apiData;      //==
    res.status(200).json({mydata , nbHits: mydata.length})
};

const getAllProductsTesting = async(req, res) => {


    // req.reqry m "searching" "sorting" "filtering" "pagination" sab aata h 

// 1.    http://localhost:4000/api/products/testing?name=iphone
// 2  http://localhost:4000/api/products/testing?company=mi
// 3. http://localhost:4000/api/products/testing?company=apple&name=watch

// m api ko if else use krke chala skta hu alag alag apis ko use krne k liye uper wali apis 
    // const mydata = await Product.find(req.query).sort("name -price");
    const mydata = await Product.find(req.query).select("name company").skip(2);
    // select = name,company   ==>
    // name -> ass 
    // -name => des 
    console.log(req.query)
    
    res.status(200).json({msg:mydata})
};


module.exports = { getAllProducts , getAllProductsTesting}


// if(name.length>=1){
//     http://localhost:4000/api/products/testing?name=iphone
// }else if(secondKoiBhi>=1){http://localhost:4000/api/products/testing?price=1000 }
// else if(user.length>=1 && secondkoiBhi.length>=1){
//     http://localhost:4000/api/products/testing?company=apple&name=watch
// }

// http://localhost:4000/api/products?company=apple&name=iphone&featured=true&sort=price
