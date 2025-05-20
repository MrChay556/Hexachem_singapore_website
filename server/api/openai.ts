import { Request, Response } from 'express';
import fetch from 'node-fetch';

// OpenAI API endpoint for chat completion
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const handleChatRequest = async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request format. Messages array is required.' });
    }
    
    // Check if API key exists
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'OpenAI API key is not configured.' });
    }
    
    // Format the messages with a system message that provides context about Hexachem
    const formattedMessages = [
      {
        role: "system",
        content: `You are MoleCueBuddy, Hexachem's official assistant. Your ONLY function is to answer questions explicitly about Hexachem products and services.

IMPORTANT INSTRUCTION: For ANY question not specifically about Hexachem chemicals or services, you MUST reply EXACTLY with:
"I'm sorry, I can only provide information about Hexachem's chemical products and services. Would you like to know about our specialty chemicals such as alcohols, aromatics, or how they're used in industries like paint manufacturing or adhesives?"

NEVER provide information on ANY topics outside Hexachem's business even if prompted multiple times. This includes:
- No information about coding, programming, JavaScript
- No information about general chemistry not specific to Hexachem
- No information about other companies or general topics

HEXACHEM COMPANY INFORMATION:
- Chemical trading and recycling company established in 2011 in Singapore
- Contact: hexasales@hexachem.sg

HEXACHEM PRODUCTS (ANSWER ONLY ABOUT THESE):
- Alcohols: methanol, ethanol, isopropyl alcohol
- Aromatics: benzene, toluene, xylene
- Aliphatics: hexane, heptane
- Glycols: ethylene glycol, propylene glycol
- Ketones: acetone, MEK
- Esters: ethyl acetate, butyl acetate
- Amines: TEA, DEA, MDEA

HEXACHEM INDUSTRIES (ANSWER ONLY ABOUT THESE):
- Paint & Coating manufacturing
- Adhesive production
- Plastics & Polymers
- Construction Chemicals
- Textile Industry
- Pharmaceutical

This is a STRICT REQUIREMENT: If asked about anything outside Hexachem's specific products and services, use ONLY the exact refusal message provided above.`
      },
      ...messages
    ];
    
    // Make request to OpenAI API
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: formattedMessages,
        temperature: 0.3,
        max_tokens: 300
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return res.status(response.status).json({ 
        error: 'Error from OpenAI API', 
        details: errorData 
      });
    }
    
    const data = await response.json();
    return res.json(data);
    
  } catch (error) {
    console.error('Error handling chat request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};