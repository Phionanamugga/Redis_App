const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

async function fetchUserData(){
    const userResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log('Request sent to external API');
    return userResponse.data;
}

async function getUserData(req, res){
    let results;
    try{
        results = await fetchUserData();
        res.send({
            dataFromCache: false,
            result: results
        });
    }catch (error) {
        console.error(error);
        res.status(404).send('Data not found');
    }
}

app.get('/users', getUserData);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});