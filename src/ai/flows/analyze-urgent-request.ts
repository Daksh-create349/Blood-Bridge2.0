'use server';

/**
 * @fileOverview An AI agent for analyzing urgent blood requests and recommending alert strategies.
 *
 * - analyzeUrgentRequest - A function that handles the analysis and recommendation process.
 * - UrgentRequestInput - The input type for the analyzeUrgentRequest function.
 * - AlertRecommendation - The return type for the analyzeUrgentRequest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UrgentRequestInputSchema = z.object({
  bloodType: z.string().describe('The blood type being requested (e.g., A+, O-).'),
  quantity: z.number().describe('The quantity of blood units needed.'),
  urgency: z
    .string()
    .describe(
      'The urgency level of the request (e.g., Critical, High, Moderate).'
    ),
  hospitalLocation: z.string().describe('The location of the requesting hospital.'),
  nearbyDonorCount: z
    .number()
    .describe('The number of potential donors in the nearby area.'),
});
export type UrgentRequestInput = z.infer<typeof UrgentRequestInputSchema>;

const AlertRecommendationSchema = z.object({
  alertTiming: z
    .string()
    .describe(
      'The recommended timing for sending out alerts (e.g., Immediately, Within 1 hour, Within 4 hours).'
    ),
  alertScope: z
    .string()
    .describe(
      'The recommended scope for sending out alerts (e.g., Local hospitals only, Regional blood banks, National).
      alertScope: z
    .string()
    .describe(
      'The recommended scope for sending out alerts (e.g., Local hospitals only, Regional blood banks, National).'    ),
  reasoning: z
    .string()
    .describe('The AI reasoning behind the alert timing and scope recommendations.'),
});
export type AlertRecommendation = z.infer<typeof AlertRecommendationSchema>;

export async function analyzeUrgentRequest(
  input: UrgentRequestInput
): Promise<AlertRecommendation> {
  return analyzeUrgentRequestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeUrgentRequestPrompt',
  input: {schema: UrgentRequestInputSchema},
  output: {schema: AlertRecommendationSchema},
  prompt: `You are an expert in blood supply chain logistics and emergency response.
  Given the details of an urgent blood request, you will analyze the situation and provide recommendations for the optimal alert timing and scope to ensure a timely response and minimize critical shortages.

  Consider the following factors:
  - Blood Type: {{{bloodType}}}
  - Quantity: {{{quantity}}} units
  - Urgency: {{{urgency}}}
  - Hospital Location: {{{hospitalLocation}}}
  - Nearby Donor Count: {{{nearbyDonorCount}}}

  Reason step by step and provide the reasoning behind the alert timing and scope recommendations.
  Finally, set the alertTiming, alertScope, and reasoning fields accordingly.

  alertTiming options:
  - Immediately
  - Within 1 hour
  - Within 4 hours

  alertScope options:
  - Local hospitals only
  - Regional blood banks
  - National`,
});

const analyzeUrgentRequestFlow = ai.defineFlow(
  {
    name: 'analyzeUrgentRequestFlow',
    inputSchema: UrgentRequestInputSchema,
    outputSchema: AlertRecommendationSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
