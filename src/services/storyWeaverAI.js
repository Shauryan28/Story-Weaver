/**
 * Mock AI Service for Story Weaver
 * In a real app, this would call an API like OpenAI or Gemini.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Story Weaver AI Service
 * Connects to Google Gemini API for story generation.
 * Falls back to Mock AI if no key is present or error occurs.
 */

export const generateStorySegment = async (dayText, previousContext = "", date = new Date()) => {
  // 1. Check for API Key
  const user = JSON.parse(localStorage.getItem('storyWeaver_currentUser') || 'null');
  const apiKey = user ? localStorage.getItem(`storyWeaver_apiKey_${user.username}`) : null;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const monthName = date.toLocaleString('default', { month: 'long' });
      const fullDate = date.toLocaleDateString();

      const prompt = `
        You are the 'Story Weaver', an expert fantasy novelist.
        You are writing a continuous novel based on the user's daily life, where:
        - Each MONTH is a new CHAPTER in the saga.
        - Each DAY (input) is a new PARAGRAPH in that chapter.
        
        Current Settings:
        - Date: ${fullDate}
        - Chapter (Month): ${monthName}
        
        Previous Story Context (The Saga So Far):
        "${previousContext.slice(-2000)}" 
        (Note: Focus on the most recent events for continuity)

        User's Input for Today: "${dayText}"

        Task:
        Write the NEXT paragraph (100-150 words) of this ongoing story.
        - If this entry is the first of a new month, start a new narrative arc or chapter theme.
        - If it is the same month, ENSURE seamless continuity from the previous text.
        - Transform the mundane user input into high fantasy or sci-fi lore.
        - Do not summarize the past; move the plot forward.
        
        Output only the story paragraph.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();

    } catch (error) {
      console.error("Gemini API Error:", error);
      // Fallback to mock if API fails
      return generateMockStory(dayText);
    }
  } else {
    // No key, use mock
    return generateMockStory(dayText);
  }
};

const generateMockStory = async (dayText) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // extract simple "keywords" (words > 4 chars) to simulate "key elements"
  const words = dayText.split(/\s+/).filter(w => w.length > 4);
  const keyword = words.length > 0 ? words[Math.floor(Math.random() * words.length)] : "mystery";
  const cleanInput = dayText.substring(0, 50) + (dayText.length > 50 ? "..." : "");

  // Long templates (~100 words)
  const templates = [
    (key, input) => `The ancient tome shifted its weight as the ink settled. It all began with a singular focus on "${key}". The protagonist, weary from the journey, found themselves facing a situation that reflected their inner turmoil: ${input}. The wind howled outside, carrying whispers of forgotten legends, but inside, the decision was clear. Every step taken previously had led to this precise moment of clarity. It wasn't just about the "${key}", but what it represented—a bridge between the known world and the shadows that lurked beyond the horizon. They took a deep breath, knowing that once this chapter was written, there was no turning back. The future was unwritten, but the ink was permanent.`,

    (key, input) => `In the grand tapestry of fate, a new thread was woven today, colored by the essence of "${key}". It started innocuously enough—${input}—but soon spiraled into something far greater. The air grew heavy with anticipation, and the shadows seemed to dance with a life of their own. Was this a sign? Or merely a coincidence? The hero paused, reflecting on the nature of "${key}" and how it had come to define their path. Friends and foes alike would eventually marvel at this turning point, though now it seemed like just another passing day. The silence of the room was broken only by the scratching of the quill, immortalizing this fleeting memory into the eternal chronicle of time.`,

    (key, input) => `The clock struck midnight as the realization hit. It was fundamentally about "${key}". Even as they recounted the day's events—"${input}"—the underlying pattern emerged clearly. The world around them was changing, shifting like sand dunes in a storm. They realized that "${key}" was not just a word, but a key to unlocking the next stage of their evolution. The stars overhead burned with a cold, distant light, indifferent to the struggles below, yet somehow, they felt watched. Guided. This wasn't the end of the story, but merely the end of the beginning. With resolved determination, they prepared for the dawn, knowing that tomorrow would bring new challenges, but also new hope derived from this very discovery.`
  ];

  const index = Math.floor(Math.random() * templates.length);
  return templates[index](keyword, cleanInput);
};
