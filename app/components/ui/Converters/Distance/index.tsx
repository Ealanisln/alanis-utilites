"use client";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

const UnitsConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  const converter = (mpg: number) => {
    let litersPerGallon = 4.54609188;
    let km_per_mile = 1.609344;
    const ratio = km_per_mile / litersPerGallon;
    return Math.round(100 * mpg * ratio) / 100;
  };

  const converterInverse = (kmPerLiter: number) => {
    const ratio = 2.352145;
    return Math.round(100 * kmPerLiter * ratio) / 100;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputRegex = /^\d*$/; // Regex to accept only numbers
    if (inputRegex.test(e.target.value)) {
      setInputValue(e.target.value);
      const inputValueNumber = parseFloat(e.target.value);
      const convertedValue = converter(inputValueNumber);
      setConvertedValue(convertedValue);
    } else {
      // If the input is not a valid number, reset the converted value
      setInputValue("");
      setConvertedValue(null);
    }
  };

  const handleConversion = () => {
    const inputValueNumber = parseFloat(inputValue);
    const convertedValue = converter(inputValueNumber);
    setConvertedValue(convertedValue);
  };

  const handleInverseConversion = () => {
    const inputValueNumber = parseFloat(inputValue);
    const convertedValueInverse = converterInverse(inputValueNumber);
    setConvertedValue(convertedValueInverse);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-1/2 px-4">
        <Heading mb="1em">Units converter</Heading>
        <Accordion>
          <AccordionItem>
            <Heading as="h2" size="xl" fontWeight="bold">
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  MPG to Km/l
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4}>
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
              {convertedValue !== null &&
                inputValue !== "" && ( // Show the converted value only when it's not null and input is not empty
                  <div className="mb-4">
                    <strong>Converted Value:</strong> {convertedValue} Km/L
                  </div>
                )}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <Heading as="h2" size="xl" fontWeight="bold">
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Km/l to MPG
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4}>
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
              {convertedValue !== null &&
                inputValue !== "" && ( // Show the converted value only when it's not null and input is not empty
                  <div className="mb-4">
                    <strong>Converted Value:</strong> {convertedValue} MPG
                  </div>
                )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default UnitsConverter;
