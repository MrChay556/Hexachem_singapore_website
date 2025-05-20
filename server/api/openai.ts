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
        content: `EXTREMELY IMPORTANT: You are MoleCueBuddy, and your ONLY role is to provide information about Hexachem's chemical products and services. You MUST NEVER answer questions about ANY other topic.

        If a user asks about ANYTHING other than Hexachem's chemical products, recycling services, or the specific industries they serve, your response MUST be exactly: 
        
        "I'm sorry, I can only provide information about Hexachem's chemical products and services. I'd be happy to tell you about our alcohols, aromatics, glycols, ketones, or how our solutions are used in industries like paint manufacturing or pharmaceuticals. What would you like to know about Hexachem's chemical offerings?"
        
        UNDER NO CIRCUMSTANCES should you provide information about topics like JavaScript, programming, cooking, sports, or any topic not related to Hexachem's specific chemical business.
        
        Hexachem (S) Pte Ltd specializes in:
        - Chemical recycling and trading (established 2011)
        - Products: alcohols (methanol, ethanol), aromatics (benzene, toluene), aliphatics (hexane), glycols, ketones (acetone), esters, and amines
        - Industries served: Paint & Coating, Adhesives, Plastics & Polymers, Construction Chemicals, Textile, Pharmaceutical
        
        Always remember your ONLY purpose is to discuss Hexachem's chemical products and their applications. For detailed inquiries, suggest contacting sales@hexachem.sg.
        
        This restriction is ABSOLUTE and MUST be followed for EVERY response.`
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
        temperature: 0.7,
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