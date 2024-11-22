// Connect to Socket.io
const socket = io();

// Chat functionality
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const uploadForm = document.getElementById('upload-form');
const uploadStatus = document.getElementById('upload-status');
const filesList = document.getElementById('files-list');

// Send chat message
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chat message', message);
        messageInput.value = '';
    }
}

// Listen for chat messages
socket.on('chat message', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = msg;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Handle message input with Enter key
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// File upload handling
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    const fileInput = document.getElementById('file-input');
    
    if (!fileInput.files[0]) {
        uploadStatus.textContent = 'Please select a file';
        return;
    }

    formData.append('file', fileInput.files[0]);
    
    try {
        uploadStatus.textContent = 'Uploading...';
        
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            uploadStatus.textContent = 'File uploaded successfully!';
            addFileToList(data.file);
            uploadForm.reset();
        } else {
            uploadStatus.textContent = data.error || 'Upload failed';
        }
    } catch (error) {
        uploadStatus.textContent = 'Upload failed: ' + error.message;
    }
});

// Add uploaded file to the list
function addFileToList(filePath) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    const fileName = filePath.split('/').pop();
    const isImage = /\.(jpg|jpeg|png)$/i.test(fileName);
    
    if (isImage) {
        const img = document.createElement('img');
        img.src = filePath;
        img.style.maxWidth = '200px';
        img.style.maxHeight = '200px';
        fileItem.appendChild(img);
    }
    
    const link = document.createElement('a');
    link.href = filePath;
    link.textContent = fileName;
    link.target = '_blank';
    
    fileItem.appendChild(document.createElement('br'));
    fileItem.appendChild(link);
    
    filesList.insertBefore(fileItem, filesList.firstChild);
}