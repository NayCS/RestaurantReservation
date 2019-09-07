//Dependecies
//
const express = require("express");
const path = require ("path");

// Seth up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express App to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

/////Restaurant Reservations

const reservations = [
/////Placeholder for Reservations
];

//Routes
///

///Basic route that send the user first to AJAX Page
app.get("/", function(req, res){
    res.sendFile(path.join(_dirname,"view.html"));
});

app.get("/add", function(req, res){
    res.sendFile(path.join(_dirname, "add.html"))
});

//Display all reservations
app.get("/api/reservations", function(req, req){
    return res.json(reservations);
});

// Display a single character, on return false 
app.get("/api/reservations/:reservation",function(req, res){
    const chosen = req.params.reservation;

    console.log(chosen);

    for (let i=0; i< reservations.length; i++){
        if (chosen === reservations[i].routeName){
            return res.json(reservations[i]);
        }
    }

    return res.json(false);
});

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

