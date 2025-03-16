import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { aiService } from './ai.service';

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string(),
    })
  ),
});

export const aiRoutes = new Hono()
  .post('/chat', async (c) => {
    console.log('AI chat endpoint hit');
    
    try {
      const body = await c.req.json();
      console.log('Request body:', body);
      
      const { messages } = body;
      console.log('Processing messages:', messages);
      
      const response = await aiService.generateChatResponse({ 
        messages,
        userId: 'anonymous' // Temporary placeholder since we removed auth
      });
      
      console.log('AI response generated:', response);
      
      return c.json({ 
        success: true,
        response 
      });
    } catch (error) {
      console.error('Error in chat endpoint:', error);
      return c.json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      }, 500);
    }
  }); 