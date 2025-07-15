import { z } from 'zod';

export const requestSchema = z.object({
  requestId: z.string().uuid(),
  image: z.string(),
  imageType: z.enum(['bmp', 'png', 'jpeg']).optional(),
  sourceId: z.string().optional(),
});

export type RequestData = z.infer<typeof requestSchema>;
