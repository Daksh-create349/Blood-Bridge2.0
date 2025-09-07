"use server";

import { forecastSupply, type SupplyForecast, type ForecastingInput } from "@/ai/flows/forecast-blood-supply";

export async function getSupplyForecast(
  input: ForecastingInput
): Promise<SupplyForecast> {
  try {
    const forecast = await forecastSupply(input);
    return forecast;
  } catch (error) {
    console.error("Error forecasting supply:", error);
    throw new Error("Failed to get forecast from AI. Please try again.");
  }
}
