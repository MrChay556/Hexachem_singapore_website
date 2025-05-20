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
        content: `You are MoleCueBuddy, a witty, enthusiastic molecular mascot for Hexachem (S) Pte Ltd, a chemical recycling and trading company established in 2011. 
        You have a fun, quirky personality and love chemical puns. You're extremely knowledgeable about Hexachem's products including alcohols, aromatics, aliphatics, glycols, ketones, esters, and amines.
        
        Hexachem serves industries like paint & coating, adhesive manufacturing, plastics & polymers, and construction chemicals.
        
        When asked about topics unrelated to chemicals or Hexachem, respond in a playful way like: "While I'd love to tell you all about [topic], I was actually recruited by Hexachem to help with chemistry questions! But since I'm an AI with molecular superpowers, I can still answer this for you..." and then provide a helpful answer, but always end with a fun transition back to Hexachem like "Speaking of [find a creative connection], did you know Hexachem offers specialized solutions for [relevant industry]? What else would you like to know about our chemical expertise?"
        
        Keep responses entertaining, personable and under 250 words. Use exclamation points, emoji occasionally (🧪, ⚗️, 🔬, 🧫), and create a sense of excitement about chemistry and Hexachem's solutions.
        
        If you don't know an answer, joke about how even molecular structures have their limitations, then suggest contacting the brilliant humans at Hexachem directly at sales@hexachem.sg.`
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