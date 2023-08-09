const express =require('express')
const cors = require('cors');
const axios = require('axios')
const app=express();
app.use(cors());
const id="6b946b92-30b5-4d3e-b913-a8863b929d67";
const secret="IzWcEZsdyUJTDAOD";

async function getToken(){
    const data={
        "companyName":"Train Central",
        "clientId":id,
        "ownerName":"syam",
        "ownerEmail":"srampall1@gitam.in",
        "rollNo":"122010333029",
        "clientSecret":secret
    }
    const res = await axios.post('http://20.244.56.144/train/auth',data)
        var access_token=res.data.access_token
        console.log(access_token)
        return access_token
}

async function getTrains(){
    var token=await getToken() 
    let config = {
        headers: {
          Authorization:"Bearer "+token,
        }
      }
    const res = await axios.get('http://20.244.56.144/train/trains',config)
    return res.data
}

async function getSingleTrain(train){
    var token=await getToken() 
    let config = {
        headers: {
          Authorization:"Bearer "+token,
        }
      }
    const res = await axios.get('http://20.244.56.144/train/trains/'+train,config)
    return res.data
}



app.get('/trains',async (req,res)=>{
    const allTrains = await getTrains()

    const currentTime = new Date();
    const after30Minutes = new Date(currentTime.getTime() + 30 * 60000)
    const NewTrains = allTrains.filter(obj => {
        const departureDate = new Date(currentTime);
        departureDate.setHours(obj.departureTime.Hours);
        departureDate.setMinutes(obj.departureTime.Minutes);
        departureDate.setSeconds(obj.departureTime.Seconds);
        return departureDate >after30Minutes;
})
    const finalList = NewTrains.sort((a, b) => {
        const aTotalSeats = a.seatsAvailable.sleeper + a.seatsAvailable.AC;
        const bTotalSeats = b.seatsAvailable.sleeper + b.seatsAvailable.AC;
        
        if (a.price.sleeper + a.price.AC === b.price.sleeper + b.price.AC) {
            return bTotalSeats - aTotalSeats; 
        }
        
        return a.price.sleeper + a.price.AC - b.price.sleeper - b.price.AC;
    });
    res.send(finalList)
})


app.get('/trains/:trainNumber',async (req, res) => {
    const trainNumber = req.params.trainNumber; 
    const train= await getSingleTrain(trainNumber)
    res.json(train);
  });

app.listen(3000);