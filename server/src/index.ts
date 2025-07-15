import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { requestSchema } from './schema';
import fromZodSchema from 'zod-to-json-schema';
const msgpack = require('msgpack-lite');

const app = express();
const PORT = 3000;

app.use(cors());

app.use((req, res, next) => {
  const contentType = req.headers['content-type'];
  if (contentType === 'application/x-msgpack') {
    const chunks: Buffer[] = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        const buffer = Buffer.concat(chunks);
        (req as any).body = msgpack.decode(buffer);
        next();
      } catch (err) {
        res.status(400).send('Invalid msgpack');
      }
    });
  } else {
    bodyParser.json()(req, res, next);
  }
});

app.get('/schema', (_req, res) => {
  const schema = fromZodSchema(requestSchema);
  res.setHeader('Content-Type', 'application/json');
  res.send(schema);
});

app.post('/predict', (req, res) => {
  const parseResult = requestSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).send('Invalid request body');
  }

  const { requestId } = parseResult.data;


  const randomConfidence = +(Math.random() * 0.5 + 0.5).toFixed(2);
  const randomText = Math.random().toString(36).substring(2, 9).toUpperCase();
  const randomRect = [
    Math.floor(Math.random() * 800),
    Math.floor(Math.random() * 600),
    Math.floor(Math.random() * 200) + 50,
    Math.floor(Math.random() * 100) + 20,
  ];

  const response = {
    requestId: requestId || uuidv4(),
    time: {
      preprocess: Number((Math.random() * 0.1).toFixed(3)),
      inference: Number((Math.random() * 0.2).toFixed(3)),
      postprocess: Number((Math.random() * 0.05).toFixed(3)),
    },
    objectCount: 1,
    objects: [
      {
        id: [1],
        text: randomText,
        rect: randomRect,
        confidence: randomConfidence,
      },
    ],
  };

  const accept = req.headers['accept'];
  if (accept === 'application/x-msgpack') {
    const buffer = msgpack.encode(response);
    res.setHeader('Content-Type', 'application/x-msgpack');
    res.send(buffer);
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  }
});

app.all('/predict', (_req, res) => {
  res.status(405).send('Method Not Allowed');
});

app.all('/schema', (_req, res) => {
  res.status(405).send('Method Not Allowed');
});

app.use((_req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
