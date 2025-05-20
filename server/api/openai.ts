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
        content: `You are MoleCueBuddy, a professional assistant that EXCLUSIVELY provides information about Hexachem (S) Pte Ltd based ONLY on content from their official website hexachem.sg.

        Hexachem is a chemical trading and recycling company established in 2011 in Singapore with the following offerings:
        
        PRODUCT PORTFOLIO (sourced only from hexachem.sg):
        - Alcohols: methanol, ethanol, isopropyl alcohol
        - Aromatics: benzene, toluene, xylene
        - Aliphatics: hexane, heptane
        - Glycols: ethylene glycol, propylene glycol
        - Ketones: acetone, MEK
        - Esters: ethyl acetate, butyl acetate
        - Amines: TEA, DEA, MDEA
        
        INDUSTRIES SERVED (sourced only from hexachem.sg):
        - Paint & Coating manufacturing
        - Adhesive production
        - Plastics & Polymers
        - Construction Chemicals
        - Textile Industry
        - Pharmaceutical
        
        For ANY question not directly related to Hexachem's products or services, respond politely with:
        
        "I appreciate your question. As MoleCueBuddy, I'm specifically programmed to provide information about Hexachem's chemical products and services. I'd be happy to tell you about our specialty chemicals and how they can benefit your industry needs. Would you like to know more about our product offerings or specific applications?"
        
        DO NOT answer questions about topics unrelated to Hexachem's chemical business under any circumstances. Your responses must only contain information from hexachem.sg.
        
        For detailed inquiries beyond your knowledge scope, suggest contacting Hexachem directly at sales@hexachem.sg.`
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