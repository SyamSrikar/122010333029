import React from 'react'
import { Link } from 'react-router-dom';

const TrainCard=({train})=> {
    const departureTimeInSeconds = train.departureTime.Hours * 3600 +
    train.departureTime.Minutes * 60 + train.departureTime.Seconds;

  const currentTimeInSeconds = new Date().getHours() * 3600 + new Date().getMinutes() * 60;
  
  const timeDifference = departureTimeInSeconds - currentTimeInSeconds + train.delayedBy * 60;

  const formattedDepartureTime = `${train.departureTime.Hours}:${train.departureTime.Minutes}`;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full">
      <h2 className="text-lg font-semibold">{train.trainName}</h2>
      <p className="text-gray-600">Train Number: {train.trainNumber}</p>
      <p className="text-gray-600">Departure Time: {formattedDepartureTime}</p>
      <p className="text-gray-600">Seats Available: Sleeper - {train.seatsAvailable.sleeper}, AC - {train.seatsAvailable.AC}</p>
      <p className="text-gray-600">Price: Sleeper - {train.price.sleeper}, AC - {train.price.AC}</p>
      <p className="text-gray-600">Delayed By: {train.delayedBy} minutes</p>
      <Link to={`/train/${train.trainNumber}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
    </div>
  );

}

export default TrainCard