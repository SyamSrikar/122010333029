import React from 'react'
import { useState,useParams,useEffect } from 'react';
import axios from 'axios'
const SingleTrain=() =>{
  const { trainNumber } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/trains/${trainNumber}`)
      .then(response => setTrain(response.data))
      .catch(error => console.error('Error fetching train details:', error));
  }, [trainNumber]);

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">{train.trainName}</h2>
      <p>Train Number: {train.trainNumber}</p>
      <p>Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}:{train.departureTime.Seconds}</p>
      <p>Seats Available: Sleeper - {train.seatsAvailable.sleeper}, AC - {train.seatsAvailable.AC}</p>
      <p>Price: Sleeper - {train.price.sleeper}, AC - {train.price.AC}</p>
      <p>Delayed By: {train.delayedBy} minutes</p>
    </div>

  );


}

export default SingleTrain