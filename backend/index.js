const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const stripe = require("stripe")(process.env.secret_Key);

app = express();

app.use(express.json());
app.use(cors());

// routes
app.get("/",(req,res)=> {
    res.send("This is the right channel..")
});

app.post("/charge",(req,res)=>{

    const{ product,token } = req.body;
    console.log("Product", product);
    console.log("Price", product.price);
    const idempotencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id 
    }).then(customer =>{
        stripe.charges.create({
            amount: product.price *100,
            currency: "nok",
            customer: customer.id,
            receipt_email: token.email,
            description: product.name,
            shipping: {
                name: token.card.name,
                address: token.card.address_country
            }
        }, {idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))

})

app.listen(5000,()=> console.log("Listening at port 5000"));