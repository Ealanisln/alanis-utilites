"use client";

import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Weather from "../components/Weather/index";
import Spinner from "../components/ui/Spinner/index";
import { WeatherApiData } from "../interfaces/WeatherApiData";
import NavBar from "../components/ui/NavBar";

export default function Clima() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherApiData | {}>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); // State variable to track errors

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_API_WEATHER_KEY}`;

  const fetchWeather = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false); // Reset error state before fetching data
    axios
      .get(url)
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
        if (response.data.cod === "404") {
          setError(true); // Set error state to true if the city is not found (response data has 'cod' property equal to '404')
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeather({}); // Set the weather state to an empty object on error
        setError(true); // Set error state to true if there's an error
      })
      .finally(() => {
        setLoading(false);
        setCity("");
      });
  };
  
  

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <NavBar />
        <Card>
            {/* Overlay */}
            <div className="relative h-screen">
            {/* Background image */}
            <div className="absolute inset-0">
            <div className="aspect-w-16 aspect-h-9">

            <Image
              src="https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2575&q=80"
              fill
              objectFit="cover"
              alt="Clouds background"
            />
            </div>
            </div>

            {/* Search */}
            <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10">
              <FormControl
                onSubmit={fetchWeather}
                className="flex justify-between items-center w-full m-auto p-3 bg-transparent text-white rounded-2xl"
              >
                <FormLabel>Weather App</FormLabel>
                <div className="flex">
                  <Input
                    type="text"
                    className="text-2xl"
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <button onClick={fetchWeather} className="ml-2">
                    <BsSearch size={20} />
                  </button>
                </div>
              </FormControl>
            </div>

            {/* Weather */}
            {error ? (
              <div className="text-white text-center mt-4">
                City not found. Please check the spelling and try again.
              </div>
            ) : (
              // Render the Weather component when there's no error
              "main" in weather && <Weather data={weather as WeatherApiData} />
            )}
            </div>
        </Card>
      </>
    );
  }
}
