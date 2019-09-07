//Dependecies
//
const express = require("express");
const path = require ("path");
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

// Seth up the Express App

const app = express();
app.use('/data', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false,
}));
app.listen(3000);
console.log('Running a GraphQL API server at localhost:3000/data');

// Sets up the Express App to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

/////Restaurant Reservations

const typeDefs = `
  type CusInfo {
    customerEmail: String
    customerID: String
    customerName: String
    phoneNumber: Int
  }
  
  type List {
    id: ID!
    cus : [CusInfo!]!
  }
`;

let cusInfo = {
    customerEmail: "thisisemail@email.come",
    customerID: "id1",
    customerName: "Jakc Frost",
    phoneNumber: "420 911 6060"
};
//Routes
///

///Basic route that send the user first to AJAX Page
app.get("/", function(req, res){
    res.sendFile(path.join(_dirname,"view.html"));
});

app.get("/add", function(req, res){
    res.sendFile(path.join(_dirname, "add.html"))
});


// Display a single character, on return false 
/*app.get("/api/reservations/:reservation",function(req, res){
    const chosen = req.params.reservation;

    console.log(chosen);

    for (let i=0; i< reservations.length; i++){
        if (chosen === reservations[i].routeName){
            return res.json(reservations[i]);
        }
    }
    return res.json(false);
});*/

// Create New Characters - takes in JSON input
app.post("/api/reservations", function (req,res){
    // req.body host is equal to the JSON post sent from the user 
    // this works because of out body parsing middleware
    var newReservations = req.body;

    //Using a RegEx Pattern to remove spaces from nemove spaces from newReservations
    //You can read more about RegEx Pattens later https://www.regexbuddy.com/regex.html
    newReservations.routeName = newReservations.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReservations);
    reservations.push(newReservations);
    res.json(newReservations);
})
    /// Starts the servers to begin listening

    app.listen(PORT, function(){
        console.log("App listning")
    })

const resolvers = {
    List: {
        id: () => "1",
        cus: () => cusInfo
    },

    CusInfo: {
        customerEmail: (parent) => parent.customerEmail,
        customerID: (parent) => parent.customerID,
        customerName: (parent) => parent.customerName,
        phoneNumber: (parent) => parent.phoneNumber
    }
};