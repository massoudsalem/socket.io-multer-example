const request = require('supertest');
const path = require('path');
const fs = require('fs');
const { app, server, io } = require('../src/app');
const Client = require('socket.io-client');

jest.setTimeout(10000); // Increase timeout to 10 seconds

beforeAll((done) => {
  server.listen(process.env.PORT || 3000, (err) => {
    if (err) return done(err);
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe('File Upload API', () => {
  afterEach(() => {
    // Clean up uploads directory after each test
    const uploadsDir = path.join(__dirname, '../uploads');
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      files.forEach(file => {
        fs.unlinkSync(path.join(uploadsDir, file));
      });
    }
  });

  test('should upload an image file successfully', async () => {
    const response = await request(app)
      .post('/upload')
      .attach('file', path.join(__dirname, 'fixtures/test-image.jpg'));

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('File uploaded successfully');
    expect(response.body.file).toMatch(/^\/uploads\/file-\d+\.jpg$/);
  });

  test('should reject non-image/pdf files', async () => {
    const response = await request(app)
      .post('/upload')
      .attach('file', path.join(__dirname, 'fixtures/test.txt'));

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Error: Images and PDFs only!');
  });

  test('should handle missing file', async () => {
    const response = await request(app)
      .post('/upload');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('No file selected');
  });
});

describe('Chat WebSocket', () => {
  let clientSocket;

  beforeEach((done) => {
    clientSocket = Client(`http://localhost:${process.env.PORT || 3000}`);
    clientSocket.on('connect', done);
  });

  afterEach(() => {
    clientSocket.close();
  });

  test('should receive chat message', (done) => {
    const testMessage = 'Hello, World!';

    clientSocket.on('chat message', (msg) => {
      expect(msg).toBe(testMessage);
      done();
    });

    clientSocket.emit('chat message', testMessage);
  });
});