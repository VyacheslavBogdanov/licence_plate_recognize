import { z } from 'zod';

const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

export const requestSchema = z.object({
  requestId: z.string().uuid(),
  image: z.string().regex(base64Regex),
  imageType: z.enum(['bmp', 'png', 'jpeg']).optional(),
  sourceId: z.string().optional(),
});

export type RequestData = z.infer<typeof requestSchema>;
