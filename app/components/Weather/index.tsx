"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Input,
  Button,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { NextPage } from 'next';
import axios from 'axios';

interface LocationData {
  name: string;
}

type CityNameResponse = {
  type: "cityName";
  cityName: string;
};

type ErrorResponse = {
  type: "error";
  message: string;
};

type ApiResponseType = CityNameResponse | ErrorResponse;

const Weather = () => {
  const [inputValue, setInputValue] = useState("");
  const [cityName, setCityName] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputRegex = /^\d{0,5}$/;
    const inputValue = e.target.value;

    if (inputRegex.test(inputValue)) {
      setInputValue(inputValue);
    }
  };

  const apiKey = process.env.API_WEATHER_KEY;

  const searchCityByZipCode = async (
    zipCode: string
  ): Promise<ApiResponseType> => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${apiKey}`
      );
      const data: LocationData | { message: string } = await response.json();

      if ("name" in data) {
        const cityName: string = data.name;
        console.log(`City name for zip code ${zipCode}: ${cityName}`);
        return { type: "cityName", cityName };
      } else {
        console.error("Error:", data.message);
        return { type: "error", message: "An error occurred." };
      }
    } catch (error: any) {
      console.error("Error:", error.message);
      return { type: "error", message: "An error occurred." };
    }
  };

  const handleSendButtonClick = async () => {
    if (inputValue) {
      setShowResults(true);
      const apiResponse = await searchCityByZipCode(inputValue);
      if (apiResponse.type === "cityName") {
        setCityName(apiResponse.cityName);
      } else {
        setCityName(null);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-1/2 px-4 py-8">
        <Card>
          <CardBody>
            <Heading mb="1em">Weather</Heading>
            <div className="flex space-x-4">
              {" "}
              {/* Wrap the Input and Button in a container */}
              <Input
                type="number"
                placeholder="Zip Code"
                onChange={handleInputChange}
                value={inputValue}
              />
              <button
                onClick={handleSendButtonClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Send
              </button>
            </div>
            <br/>
            <Card>
              <CardBody>
                {showResults && cityName !== null && <p>City: {cityName}</p>}
                {showResults && cityName === null && (
                  <p>Error: An error occurred.</p>
                )}
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Weather;
