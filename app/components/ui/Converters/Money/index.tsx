"use client";

import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import { Select, Heading } from "@chakra-ui/react";

interface ConversionResult {
  new_amount: number;
  new_currency: string;
  old_amount: number;
  old_currency: string;
}

const Converter = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState("");

  const callAPI = async () => {
    const options = {
      method: "GET",
      url: "https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency",
      params: {
        have: selectedCurrency,
        want: selectedCurrencyTo,
        amount: inputValue,
      },
      headers: {
        "X-RapidAPI-Key": "0d4240a0eemsh13763dc2f855769p1634fdjsn65dfda1cf294",
        "X-RapidAPI-Host": "currency-converter-by-api-ninjas.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request<ConversionResult>(options);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputRegex = /^\d*$/; // Regex to accept only numbers
    if (inputRegex.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-1/2 px-4">
        <Heading mb='1em'>
        Currency converter
        </Heading>
        <div className="mb-4">
          <label className="block mb-2">Enter Amount (numbers only):</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 1, marginRight: "1rem" }}>
            <Select
              placeholder="From"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              <option value="MXN">MXN</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </Select>
          </div>
          <div style={{ flex: 1 }}>
            <Select
              placeholder="To"
              value={selectedCurrencyTo}
              onChange={(e) => setSelectedCurrencyTo(e.target.value)}
            >
              <option value="MXN">MXN</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </Select>
          </div>
        </div>

        <br />
        <div className="mb-4">
          <button
            onClick={callAPI}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Convert
          </button>
        </div>
        {result && (
          <div>
            <strong>Result:</strong> {result.new_amount} {result.new_currency}
          </div>
        )}
        <br />
      </div>
    </div>
  );
};

export default Converter;
