import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherApp from "./WeatherApp";
import axios from "axios";

// Mock Axios
jest.mock("axios");

describe("WeatherApp", () => {
  it("fetches weather data and displays it", async () => {
    // Mock Axios response
    const mockedResponse = {
      data: {
        main: { temp: 22, humidity: 70 },
        weather: [{ main: "Cloudy", icon: "04d" }],
        name: "London",
      },
    };

    // Mock Axios.get to resolve with mockedResponse
    axios.get.mockResolvedValueOnce(mockedResponse);

    // Render the WeatherApp component
    render(<WeatherApp />);

    // Interact with the UI
    const cityInput = screen.getByLabelText("City");
    const getWeatherButton = screen.getByText("Get Weather");

    // Enter a city and fetch weather
    fireEvent.change(cityInput, { target: { value: "London" } });
    fireEvent.click(getWeatherButton);

    // Wait for the weather data to be displayed
    const weatherName = await screen.findByText("London");
    const weatherCondition = screen.getByText("Cloudy");
    const weatherTemperature = screen.getByText("22°C");
    const weatherHumidity = screen.getByText("Humidity: 70%");

    // Assert that the weather data is displayed
    expect(weatherName).toBeInTheDocument();
    expect(weatherCondition).toBeInTheDocument();
    expect(weatherTemperature).toBeInTheDocument();
    expect(weatherHumidity).toBeInTheDocument();
  });

  it("displays an error message if the API request fails", async () => {
    // Mock Axios.get to reject with an error
    axios.get.mockRejectedValueOnce(new Error("API request failed"));

    // Render the WeatherApp component
    render(<WeatherApp />);

    // Interact with the UI
    const cityInput = screen.getByLabelText("City");
    const getWeatherButton = screen.getByText("Get Weather");

    // Enter a city and fetch weather
    fireEvent.change(cityInput, { target: { value: "London" } });
    fireEvent.click(getWeatherButton);

    // Wait for the error message to be displayed
    const errorMessage = await screen.findByText("Error, try again later");
    expect(errorMessage).toBeInTheDocument();
  });
});
