"use client";

import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

const UnitsConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  const num = inputValue;
  const converter = (mpg: number) => {
    let l_per_galloon = 4.54609188;
    let km_per_mile = 1.609344;
    const ratio = km_per_mile / l_per_galloon;
    return Math.round(100 * mpg * ratio) / 100;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputRegex = /^\d*$/; // Regex to accept only numbers
    if (inputRegex.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const handleConversion = () => {
    const inputValueNumber = parseFloat(inputValue);
    const convertedValue = converter(inputValueNumber);
    setConvertedValue(convertedValue);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-1/2 px-4">
        <Heading mb="1em">Units converter</Heading>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>MPG to KM/L</Tab>
            <Tab>KM/L to MPG</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="mb-4">
                <label className="block mb-2">
                  Enter Amount (numbers only):
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <button onClick={handleConversion} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">Convert</button>
              </div>
              {convertedValue && (
                <div className="mb-4">
                  <strong>Converted Value:</strong> {convertedValue} Km/L
                </div>
              )}
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default UnitsConverter;
