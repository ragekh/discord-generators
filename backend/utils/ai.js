const { OpenAI } = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

/**
 * Cache for storing API responses to reduce duplicate requests
 * Simple in-memory cache with TTL (time-to-live)
 */
const responseCache = new Map();
const CACHE_TTL = 3600000; // 1 hour in milliseconds

/**
 * Generate text using OpenAI API with caching
 * @param {string} prompt - The prompt to send to the API
 * @param {Object} options - Additional options for the API request
 * @returns {Promise<string>} The generated text
 */
async function generateText(prompt, options = {}) {
  // Create a copy of options without the timestamp to prevent cache busting
  const { timestamp, ...cacheableOptions } = options;
  
  // Create a cache key from the prompt and cacheable options
  const cacheKey = JSON.stringify({ prompt, options: cacheableOptions });
  
  // If timestamp is provided, skip cache for regeneration requests
  const skipCache = timestamp !== undefined;
  
  // Check if we have a cached response and we're not skipping cache
  if (!skipCache && responseCache.has(cacheKey)) {
    const cachedItem = responseCache.get(cacheKey);
    // Check if the cached item is still valid
    if (Date.now() - cachedItem.timestamp < CACHE_TTL) {
      console.log('Using cached response');
      return cachedItem.response;
    }
    // Remove expired cache item
    responseCache.delete(cacheKey);
  }
  
  try {
    // Default options
    const defaultOptions = {
      model: 'meta-llama/llama-3.3-70b-instruct:free',
      max_tokens: 300,
    };
    
    // Merge default options with provided options
    const mergedOptions = { ...defaultOptions, ...options };
    
    const response = await openai.chat.completions.create({
      model: mergedOptions.model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: mergedOptions.max_tokens,
    });
    
    const result = response.choices[0].message.content.trim();
    
    // Cache the response
    responseCache.set(cacheKey, {
      response: result,
      timestamp: Date.now()
    });
    
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to generate content');
  }
}

module.exports = {
  generateText
};