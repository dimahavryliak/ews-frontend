import { Event } from "../app/api/eventsApi";

export function recommendSimilarEvents(
  allEvents: Event[],
  currentEvent: Event,
  maxRecommendations: number = 5
): Event[] {
  return allEvents
    .filter(
      (event) =>
        event.id !== currentEvent.id && // Exclude the current event
        event.category === currentEvent.category && // Match category
        Math.abs(
          new Date(event.date).getTime() - new Date(currentEvent.date).getTime()
        ) <=
          7 * 24 * 60 * 60 * 1000 // Match events within 7 days
    )
    .slice(0, maxRecommendations); // Limit the number of recommendations
}
