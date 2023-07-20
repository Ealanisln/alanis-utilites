import Image from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Select,
  Heading,
} from "@chakra-ui/react";
import { WeatherApiData } from "../../interfaces/WeatherApiData";

const Weather: React.FC<{ data: WeatherApiData }> = ({ data }) => {
  console.log(data);

  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-1/2 px-4 py-8">
        <Card  style={{ background: "rgba(173, 216, 230, 0.5)" }}>
          <CardBody>
            <div className="relative flex justify-between pt-12">
              <div className="flex flex-col items-center">
                <Image
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt="Clouds"
                  width="100"
                  height="100"
                />
                <p className="text-2xl">{data.weather[0].main}</p>
              </div>
              <p className="text-9xl">{data.main.temp.toFixed(0)}&#176;</p>
            </div>
            <div className=" relative p-8 rounded-md">
            <p className="text-2xl text-center pb-6">Weather in {data.name} {data.sys.country}</p>
            <div className="flex justify-between text-center">
              <div>
                <p className="font-bold text-2xl">
                  {data.main.feels_like.toFixed(0)}&#176;
                </p>
                <p className="text-xl">Feels Like</p>
              </div>
              <div>
                <p className="font-bold text-2xl">{data.main.humidity}%</p>
                <p className="text-xl">Humidity</p>
              </div>
              <div>
                <p className="font-bold text-2xl">
                  {data.wind.speed.toFixed(0)} MPH
                </p>
                <p className="text-xl">Winds</p>
              </div>
            </div>
          </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Weather;
