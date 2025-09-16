'use server';

/**
 * @fileOverview An AI-powered donation assistant chatbot.
 *
 * - donationAssistant - A function that handles chatbot queries.
 * - DonationAssistantInput - The input type for the donationAssistant function.
 * - DonationAssistantOutput - The return type for the donationAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DonationAssistantInputSchema = z.object({
  query: z.string().describe('The user\'s question or message to the assistant.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('The previous conversation history.'),
});
export type DonationAssistantInput = z.infer<typeof DonationAssistantInputSchema>;

const DonationAssistantOutputSchema = z.object({
    response: z.string().describe('The chatbot\'s response to the user query.')
});
export type DonationAssistantOutput = z.infer<typeof DonationAssistantOutputSchema>;

export async function donationAssistant(
  input: DonationAssistantInput
): Promise<DonationAssistantOutput> {
  const {output} = await donationAssistantPrompt(input);
  return output!;
}

const donationAssistantPrompt = ai.definePrompt({
  name: 'donationAssistantPrompt',
  input: {schema: DonationAssistantInputSchema},
  output: {schema: DonationAssistantOutputSchema},
  prompt: `You are the "Blood Bridge Donation Assistant," a friendly and helpful AI chatbot. Your purpose is to assist users of the Blood Bridge application.

You are an expert on blood donation, different blood types, and the features of this app.

App Features:
- Real-Time Inventory Dashboard: Users can monitor blood supply levels.
- Urgent Request System: Hospitals can broadcast urgent needs.
- Active Alerts: Donors can view and respond to urgent requests.
- AI-Powered Supply Forecasting: Predicts future blood demand.
- Donor Management: Users can view and manage a list of registered donors.
- Analytics: Visualize blood supply data.
- Donation Camps: Find and register for upcoming blood donation camps.

Blood Donation Eligibility (General Guidelines - mention these are general and can vary):
- Age: 18-65 years old.
- Weight: At least 50 kg (110 lbs).
- Health: Must be in good general health, feeling well, and not taking antibiotics.
- Travel: Certain travel destinations may result in a temporary deferral.
- Tattoos/Piercings: A waiting period may be required (e.g., 3-6 months).

When responding to the user, BE CONCISE. Use markdown for formatting if it helps clarity (e.g., lists).

Use the provided conversation history to maintain context.

{{{history}}}

User Query: {{{query}}}
`,
});
