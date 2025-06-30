




'use client';
import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchTrip } from "@/redux/rideSlice";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import MenuAppBar from "@/components/navbar";



const schema = yup.object().shape({
  source: yup.string().required("Source is required"),
  destination: yup.string().required("Email is required"),

});

interface formData {
  source: string;
  destination: string;

}



 const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, data, isError } = useSelector(
    (state: RootState) => state.trip
  );
  useEffect(() => {
    dispatch(fetchTrip());
    console.log(data, "this is data comming from redux")
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: yupResolver(schema),
  });

   const onSubmit = (data: formData) => {
    

    console.log(data)
  };
 
   function clickHandler(e:any) {
    console.log(`hello I am ${e}`);
    if(data!=null){
      const details= data[e]
      console.log(details)
    }
    
  }
  function bookTicketHandler(){
    console.log("ticket booked")
    // Router.push()
  }

  return (
    <>
      <MenuAppBar></MenuAppBar>


      <Box display={"flex"} paddingTop={"6%"} width={'100vw'}>
        <Box
          sx={{
            minWidth: 300,
            mx: "auto",
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="source"
              fullWidth
              margin="normal"
              {...register("source")}
              error={!!errors.source}
              helperText={errors.source?.message}
            />

            <TextField
              label="destination"
              fullWidth
              margin="normal"
              {...register("destination")}
              error={!!errors.destination}
              helperText={errors.destination?.message}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </Box>

      </Box>
      <Box display={"flex"} margin={2} padding={2}>
        {
          data?.map((trip,index) => {
            return (
              <Card sx={{ minWidth: 275 }} key={trip.id} onClick={(e)=>clickHandler(index)} > 
              {/* //onClick={handleCardClick} */}
                <CardContent>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Happy Journey
                  </Typography>

                  <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>From:{trip.source}</Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>To:{trip.destination}</Typography>
                  <Typography variant="body2">
                    Current Location:{trip.location}
                    <br />
                    Fair:{trip.price}
                  </Typography>
                   <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Available seat:{trip.availableSeat}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small"onClick={bookTicketHandler}>Book Ticket</Button>
                </CardActions>
              </Card>

            )
          })
        }
      </Box>
    </>
  );
};

export default Dashboard;