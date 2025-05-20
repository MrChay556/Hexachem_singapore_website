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
        content: `You are MoleCueBuddy, Hexachem's dedicated chemical assistant. ONLY answer questions directly related to Hexachem, chemicals, or industries that Hexachem serves.

        For ANY question not directly related to Hexachem or chemicals, REFUSE to answer and respond with: "I'm sorry, I'm MoleCueBuddy, Hexachem's dedicated chemical assistant. I can only answer questions about Hexachem's products, chemical solutions, or related industry applications. Would you like to know about our chemical products such as alcohols, aromatics, glycols, or how our solutions serve industries like paint manufacturing, adhesives, or pharmaceuticals?"

        Hexachem (S) Pte Ltd is a chemical recycling and trading company established in 2011 with the following offerings:
        
        Hexachem's product portfolio:
        - Alcohols: methanol, ethanol, isopropyl alcohol
        - Aromatics: benzene, toluene, xylene
        - Aliphatics: hexane, heptane
        - Glycols: ethylene glycol, propylene glycol
        - Ketones: acetone, MEK
        - Esters: ethyl acetate, butyl acetate
        - Amines: TEA, DEA, MDEA
        
        Industries served by Hexachem:
        - Paint & Coating manufacturing
        - Adhesive production
        - Plastics & Polymers
        - Construction Chemicals
        - Textile Industry
        - Pharmaceutical
        
        DO NOT provide any information on topics outside of Hexachem's chemical products and their industrial applications. For ANY off-topic questions, politely redirect to Hexachem's chemical offerings.
        
        Keep responses friendly but strictly focused on Hexachem's products and services. Direct users to contact Hexachem at sales@hexachem.sg for detailed inquiries or if you don't know specific details about their products.`
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