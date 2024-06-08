document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('questionTypeBox').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function fetchAnswerFromAPI(question) {
    try {
        const apiUrl = `https://chatgpt.apinepdev.workers.dev/?question=${encodeURIComponent(question)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const answer = data.answer;

        const loadingMessage = chatbox.querySelector('.bot-message.message:last-child');
        if (loadingMessage) {
            loadingMessage.textContent = `Dafin AI : ${answer}`;
        } else {
            const botMessage = document.createElement('div');
            botMessage.className = 'bot-message message';
            botMessage.textContent = `Dafin AI : ${answer}`;
            chatbox.appendChild(botMessage);
        }

        chatbox.scrollTop = chatbox.scrollHeight;
    } catch (error) {
        addMessage("Ooops error!!.");
    }
}
async function sendMessage() {
    const questionTypeBox = document.getElementById('questionTypeBox');
    const chatbox = document.getElementById('chatbox');
    const userMessage = questionTypeBox.value;

    if (userMessage.trim() !== '') {
        addMessage(`Kamu : ${userMessage}`, 'user');

        const loadingMessage = document.createElement('div');
        loadingMessage.className = 'bot-message message';
        loadingMessage.textContent = "Dafin AI : Loading...";
        chatbox.appendChild(loadingMessage);

        await fetchAnswerFromAPI(userMessage);
    }

    questionTypeBox.value = '';
}

function addMessage(text, sender) {
    const chatbox = document.getElementById('chatbox');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = text;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}