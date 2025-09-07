"use server";

import { analyzeUrgentRequest, type AlertRecommendation, type UrgentRequestInput } from "@/ai/flows/analyze-urgent-request";

export async function getUrgentRequestAnalysis(
  input: UrgentRequestInput
): Promise<AlertRecommendation> {
  try {
    const recommendation = await analyzeUrgentRequest(input);
    return recommendation;
  } catch (error) {
    console.error("Error analyzing urgent request:", error);
    throw new Error("Failed to get analysis from AI. Please try again.");
  }
}
