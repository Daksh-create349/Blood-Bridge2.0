'use server';

/**
 * @fileOverview An AI agent to forecast blood supply based on historical data and upcoming events.
 *
 * - forecastSupply - A function that handles the blood supply forecasting process.
 * - ForecastingInput - The input type for the forecastSupply function.
 * - SupplyForecast - The return type for the forecastSupply function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ForecastingInputSchema = z.object({
  bloodType: z.string().describe('The blood type to forecast for (e.g., A+, O-).'),
  historicalData: z
    .string()
    .describe(
      'Historical blood supply data, including dates and quantities.  Format should be clear and easily parsable (e.g., CSV or similar structured text)'
    ),
  upcomingEvents: z
    .string()
    .describe(
      'Information about upcoming events that might affect blood supply or demand (e.g., holidays, planned surgeries). Format should be clear and easily parsable.'
    ),
});
export type ForecastingInput = z.infer<typeof ForecastingInputSchema>;

const SupplyForecastSchema = z.object({
  predictedDemand: z.string().describe('The predicted demand for the specified blood type.'),
  shortageRisk: z
    .string()
    .describe('The risk of a shortage, expressed as low, medium, or high.'),
  recommendations: z
    .string()
    .describe(
      'Actionable recommendations to manage blood inventories and prevent critical shortages.'
    ),
});
export type SupplyForecast = z.infer<typeof SupplyForecastSchema>;

export async function forecastSupply(input: ForecastingInput): Promise<SupplyForecast> {
  return forecastSupplyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'forecastSupplyPrompt',
  input: {schema: ForecastingInputSchema},
  output: {schema: SupplyForecastSchema},
  prompt: `You are a highly skilled data scientist specializing in blood supply forecasting.

  Based on the historical data and upcoming events provided, forecast the predicted demand, assess the risk of a shortage, and provide actionable recommendations.

  Blood Type: {{{bloodType}}}
  Historical Data: {{{historicalData}}}
  Upcoming Events: {{{upcomingEvents}}}

  Consider factors such as seasonal trends, historical demand fluctuations, and the impact of upcoming events on both supply and demand.

  Format your response clearly and concisely.
`,
});

const forecastSupplyFlow = ai.defineFlow(
  {
    name: 'forecastSupplyFlow',
    inputSchema: ForecastingInputSchema,
    outputSchema: SupplyForecastSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
