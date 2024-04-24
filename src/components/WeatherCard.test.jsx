import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherCard from "./WeatherCard";

jest.mock("@mui/material/Avatar", () => {
  return jest.fn(() => <div>Avatar Component</div>);
});

describe("WeatherCard", () => {
  it("renders weather information correctly", () => {
    const weather = {
      main: { temp: 22, humidity: 70 },
      weather: [{ main: "Cloudy", icon: "04d" }],
      name: "London",
    };

    render(<WeatherCard weather={weather} />);

    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("Cloudy")).toBeInTheDocument();
    expect(screen.getByText("22°C")).toBeInTheDocument();
    expect(screen.getByText("Humidity: 70%")).toBeInTheDocument();
  });
});
