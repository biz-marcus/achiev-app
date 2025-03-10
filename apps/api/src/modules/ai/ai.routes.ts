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
  .post('/chat', zValidator('json', chatSchema), async (c) => {
    const { messages } = c.req.valid('json');
    
    const response = await aiService.generateChatResponse({ 
      messages,
      userId: 'anonymous' // Temporary placeholder since we removed auth
    });
    return c.json({ response });
  }); 