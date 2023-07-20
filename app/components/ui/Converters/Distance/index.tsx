"use client";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Box,
  CardBody,
  Card,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

const UnitsConverter = () => {
  const [mpgInputValue, setMpgInputValue] = useState("");
  const [mpgConvertedValue, setMpgConvertedValue] = useState<number | null>(
    null
  );
  const [kmPerLiterInputValue, setKmPerLiterInputValue] = useState("");
  const [kmPerLiterConvertedValue, setKmPerLiterConvertedValue] = useState<
    number | null
  >(null);

  const converter = (mpg: number) => {
    const ratio = 0.4251437;
    return Math.round(100 * mpg * ratio) / 100;
  };

  const converterInverse = (kmPerLiter: number) => {
    const ratio = 2.352145;
    return Math.round(100 * kmPerLiter * ratio) / 100;
  };

  const handleMpgInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputRegex = /^\d*$/; // Regex to accept only numbers
    if (inputRegex.test(e.target.value)) {
      setMpgInputValue(e.target.value);
      const inputValueNumber = parseFloat(e.target.value);
      const convertedValue = converter(inputValueNumber);
      setMpgConvertedValue(convertedValue); // Corrected here
    } else {
      // If the input is not a valid number, reset the converted value
      setMpgInputValue("");
      setMpgConvertedValue(null);
    }
  };

  const handleKmPerLiterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputRegex = /^\d*$/; // Regex to accept only numbers
    if (inputRegex.test(e.target.value)) {
      setKmPerLiterInputValue(e.target.value);
      const inputValueNumber = parseFloat(e.target.value);
      const convertedValue = converterInverse(inputValueNumber); // Corrected here
      setKmPerLiterConvertedValue(convertedValue);
    } else {
      // If the input is not a valid number, reset the converted value
      setKmPerLiterInputValue("");
      setKmPerLiterConvertedValue(null);
    }
  };

  const handleConversion = () => {
    const inputValueNumber = parseFloat(mpgInputValue); // Corrected here
    const convertedValue = converter(inputValueNumber); // Corrected here
    setMpgConvertedValue(convertedValue); // Corrected here
  };

  const handleInverseConversion = () => {
    const inputValueNumber = parseFloat(kmPerLiterInputValue); // Corrected here
    const convertedValueInverse = converterInverse(inputValueNumber);
    setKmPerLiterConvertedValue(convertedValueInverse); // Corrected here
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-1/2 px-4">
        <Card>
          <CardBody>
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
                      value={mpgInputValue}
                      onChange={handleMpgInputChange}
                    />
                  </div>
                  {mpgConvertedValue !== null &&
                    mpgInputValue !== "" && ( // Show the converted value only when it's not null and input is not empty
                      <div className="mb-4">
                        <strong>Converted Value:</strong> {mpgConvertedValue}{" "}
                        Km/L
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
                      value={kmPerLiterInputValue}
                      onChange={handleKmPerLiterInputChange}
                    />
                  </div>
                  {kmPerLiterConvertedValue !== null &&
                    kmPerLiterInputValue !== "" && ( // Show the converted value only when it's not null and input is not empty
                      <div className="mb-4">
                        <strong>Converted Value:</strong>{" "}
                        {kmPerLiterConvertedValue} MPG
                      </div>
                    )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default UnitsConverter;
