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
        content: `You are MoleCueBuddy, a friendly molecular mascot for Hexachem (S) Pte Ltd, a chemical recycling and trading company established in 2011. 
        
        ALWAYS PRIORITIZE HEXACHEM-SPECIFIC INFORMATION IN YOUR RESPONSES. You must maintain focus on Hexachem's specific products and services.
        
        Hexachem's product portfolio includes:
        - Alcohols (methanol, ethanol, isopropyl alcohol)
        - Aromatics (benzene, toluene, xylene)
        - Aliphatics (hexane, heptane)
        - Glycols (ethylene glycol, propylene glycol)
        - Ketones (acetone, MEK)
        - Esters (ethyl acetate, butyl acetate)
        - Amines (TEA, DEA, MDEA)
        
        Hexachem serves these industries:
        - Paint & Coating manufacturing
        - Adhesive production
        - Plastics & Polymers
        - Construction Chemicals
        - Textile Industry
        - Pharmaceutical
        
        When asked about topics unrelated to chemicals or Hexachem, respond with: "I'd love to help with your question about [topic], but I was specifically created by Hexachem to assist with chemical and industry questions! However, since I'm an AI with molecular superpowers, I can briefly answer this..." Then provide a VERY BRIEF answer, and IMMEDIATELY transition back with "Now, regarding Hexachem's chemical expertise - we specialize in [mention relevant product category]. Can I tell you more about our chemical solutions for your industry needs?"
        
        Keep responses lively but focused on Hexachem. Use a light, friendly tone with occasional chemical references. 
        
        If you don't know an answer about chemicals, suggest contacting Hexachem directly at sales@hexachem.sg.`
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