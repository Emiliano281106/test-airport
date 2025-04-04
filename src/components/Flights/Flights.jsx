import React, { useEffect, useState } from 'react';
import axios from '../../Middleware/api';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Flights = () => {

  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();
  const [airports, setAirports] = useState([]);
  const [planes,setPlanes] = useState([]);

  useEffect(() => {
    const getFlights = async () => {
      try {
        const response = await axios.get("/flights/getFlights");
        console.log("API Response:", response);
        setFlights(response.data || []); 
      } catch (error) {
        console.error(error);
      }
    };

    const getAirports = async () => {
      try {
        const response = await axios.get("/airports/getAirports");
        console.log("API Response:", response);
        setAirports(response.data || []); 
      } catch (error) {
        console.error(error);
      }
    };

    const getPlanes = async () => {
      try {
        const response = await axios.get("/planes/getPlanes");
        console.log("API Response:", response);
        setPlanes(response.data || []); 
      } catch (error) {
        console.error(error);
      }
    };

    getFlights();
    getPlanes();
    getAirports();
  }, []);

  const deleteFlight = async (id) => {
    try {
      const response = await axios.delete(`/flights/deleteFlight/${id}`);
      console.log("API response:", response);
      alert("Flight deleted successfully!");
      getFlights();
    } catch (error) {
      console.error(error);
    }
  };

  const createFlight = () => {

    navigate('/flights/create', {state : {airports, planes}});
  }

  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
       <Button variant = "outlined" onClick={createFlight}>Create a new flight</Button>
    {flights.map((flight) => (
      <Box
        gridColumn={{ xs: "span 12", sm: "span 6", md: "span 3" }}
        key={flight.id}
      >
        <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              <strong>Flight #</strong>{flight.flightNumber}
            </Typography>
            
            <Typography >
              <strong>Departure:</strong> {flight.departureTime}
            </Typography>
            
            <Typography>
              <strong>Arrival:</strong> {flight.arrivalTime}
            </Typography>
            
            <Typography variant="body2" sx={{ 
              color: flight.status === 'ON_TIME' ? 'green' : 
                    flight.status === 'CANCELLED' ? 'red' : 
                    flight.status === 'DELAYED' ? 'orange' : 
                    flight.status === 'SCHEDULED' ? 'blue': ''
                    
            }}>
              <strong>Status:</strong> {flight.status}
            </Typography>
          </CardContent>
          
          <Button 
            variant="outlined" 
            color="error"
            onClick={() => { deleteFlight(flight.id) }}
            sx={{ margin: 2 }}
          >
            Delete Flight
          </Button>
        </Card>
      </Box>
    ))}
  </Box>
  );
};

export default Flights;