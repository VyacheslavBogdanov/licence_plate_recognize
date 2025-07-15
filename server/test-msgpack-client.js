const http = require('http');
const msgpack = require('msgpack-lite');

const data = {
  requestId: '123e4567-e89b-12d3-a456-426614174000',
  image: 'BASE64_IMAGE_STRING',
  imageType: 'png',
  sourceId: 'camera1'
};

const encoded = msgpack.encode(data);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/predict',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-msgpack',
    'Accept': 'application/x-msgpack',
    'Content-Length': encoded.length,
  },
};

const req = http.request(options, (res) => {
  const chunks = [];

  res.on('data', (chunk) => {
    chunks.push(chunk);
  });

  res.on('end', () => {
    const buffer = Buffer.concat(chunks);
    const decoded = msgpack.decode(buffer);
	console.log('Ответ от сервера (декодировано):', JSON.stringify(decoded, null, 2));

  });
});

req.on('error', (e) => {
  console.error('Ошибка запроса:', e);
});

req.write(encoded);
req.end();
