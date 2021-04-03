const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}

app.get("/", (req, res) => {
    res.send("hello")
})

app.post("/locations", async (req, res) => {
    const address = req.body.address;
    const maxRadius = (req.body.maxRadius * 1000);
    const location = req.body.location;

    var latitude = 0;
    var longitude = 0;

    const data = {"address": address, "key": "AIzaSyCbI8RqNJ5s4oMF7ictSMF0Vl9q-A9jBuY"}


    await fetch(`https://maps.googleapis.com/maps/api/geocode/json?` + encodeQueryData(data))
    .then(response => response.json())
    .then(data => {
        latitude = data.results[0].geometry.location.lat;
        longitude = data.results[0].geometry.location.lng;
    })

    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${maxRadius}&type=${location}&key=AIzaSyCbI8RqNJ5s4oMF7ictSMF0Vl9q-A9jBuY`

    const result = await fetch(url)
    .then(response => response.json())
    .then(data => {
        const nearestFive = []
        for(let count = 0; count < Math.min(data.results.length, 5); count++){
            nearestFive.push(data.results[count]);
        }
        return nearestFive;
    })

    var newArray = result.map((item) => {
        return {
            vicinity: item.vicinity,
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
            name: item.name
        }
    });

    var covidLongitude = 0;
    var covidLatitude = 0;

    // newArray.forEach(
    //     let restaurant = {"address": item.vicinity, "key": "AIzaSyCbI8RqNJ5s4oMF7ictSMF0Vl9q-A9jBuY"}
    // )

    const maxValues = await Promise.all(newArray.map(async (item) => {
        var value = 0;

        let restaurant = {"address": item.vicinity, "key": "AIzaSyCbI8RqNJ5s4oMF7ictSMF0Vl9q-A9jBuY"}

        await fetch(`https://maps.googleapis.com/maps/api/geocode/json?` + encodeQueryData(restaurant))
        .then(response => response.json())
        .then( data => {
            latitude = data.results[0].geometry.location.lat;
            longitude = data.results[0].geometry.location.lng;
        })
        
        await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&type=hospital&key=AIzaSyCbI8RqNJ5s4oMF7ictSMF0Vl9q-A9jBuY`)
        .then(response => response.json())
        .then(data => {
            covidLatitude = data.results[0].geometry.location.lat;
            covidLongitude = data.results[0].geometry.location.lng;
        })

        return await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${latitude},${longitude}&destinations=${covidLatitude}, ${covidLongitude}&key=AIzaSyCbI8RqNJ5s4oMF7ictSMF0Vl9q-A9jBuY`)
        .then(response => response.json())
        .then(data => {
            return Promise.resolve(data.rows[0].elements[0].distance);
        })
    }));

    const response = {
        names: newArray.map((item) => item.name),
        addresses: newArray.map((item) => item.vicinity),
        closestFive: maxValues,
    }

    console.log(response);
    res.json(response);
})

app.listen(3001, () => {
    console.log("RUNNING ON PORT 3001");
})