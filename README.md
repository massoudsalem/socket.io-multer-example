# File Upload & Real-Time Chat System

A simple web application that combines file upload functionality with real-time chat capabilities. Built with Express.js, Socket.IO, and vanilla JavaScript.

## Features

- File Upload:
  - Support for images (JPG, PNG) and PDF files
  - 5MB file size limit
  - Preview for uploaded images
  - List of uploaded files with direct links
  
- Real-Time Chat:
  - Instant messaging
  - Automatic scroll to latest messages
  - Simple and intuitive interface

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation


1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

### File Upload
1. Click the file input field in the "File Upload" section
2. Select an image (JPG, PNG) or PDF file
3. Click the "Upload" button
4. The uploaded file will appear in the "Uploaded Files" section
   - Images will show a preview
   - All files will have a clickable link

### Chat
1. Enter your message in the text input field
2. Click "Send" or press Enter to send the message
3. Messages will appear in the chat window above
4. The chat window automatically scrolls to show new messages

## Development

### Available Scripts

- `npm run dev`: Start the development server with hot reload
- `npm start`: Start the production server
- `npm test`: Run the test suite
- `npm run test:watch`: Run tests in watch mode

### Project Structure

```
project/
├── src/
│   └── app.js          # Main application file
├── public/
│   ├── index.html      # Frontend HTML
│   └── main.js         # Frontend JavaScript
├── tests/
│   ├── app.test.js     # Test suite
│   └── fixtures/       # Test files
└── uploads/            # Uploaded files directory
```

### Running Tests

The project includes tests for both the file upload API and WebSocket chat functionality. Run the tests using:

```bash
npm test
```

## Technical Details

- **File Upload**:
  - Uses Multer for handling multipart/form-data
  - Validates file types and size
  - Stores files in local `uploads` directory
  
- **Chat System**:
  - Built with Socket.IO for real-time communication
  - Broadcasts messages to all connected clients
  - Simple event-based messaging system


## License

This project is licensed under the MIT License - see the LICENSE file for details, this project is for my students to learn how to build a simple file upload and chat system using Node.js, Express.js, Socket.IO, and vanilla JavaScript. Feel free to use it for educational purposes.