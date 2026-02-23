const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const chat = require('../models/messageModel');
const session = require('../models/sessionModel');

const generateSessionName = async({ sessionId, content }) => {
    const messageCount = await chat.countDocuments({ sessionId });

    if(messageCount === 0){
        const titleResponse = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{
          role: "user",
          content: `Generate a short 4-5 word title for a chat that starts with: "${content}". Return only the title, nothing else.`
        }]
      });

      const title = titleResponse.choices[0].message.content;
      await session.findByIdAndUpdate(sessionId, { title })
      return title;
    }
}

const createMessageService = async({ userId, sessionId, content }) => {
    const thisSession = await session.findById(sessionId);

    const generatedTitle = await generateSessionName({ sessionId, content });

    //fetch history
    const historyDocs = await chat.find({ sessionId }).sort({ createdAt: 1 })
    const chatHistory = historyDocs.map(m => ({
      role: m.role,
      content: m.content
    }))

    await chat.create({
      sessionId: thisSession._id,
      userId,
      role: 'user',
      content
    });

    const response = await fetch('http://localhost:8000/query', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        message: content,
        chatHistory: chatHistory
      })
    })

    const data = await response.json();
    const aiResponse = data.response;
    await chat.create({
      sessionId: thisSession._id,
      userId,
      role: 'assistant',
      content: aiResponse
    });

    return { message: 'Chat content updated successfully', content, aiResponse, title: generatedTitle || null };

}

const getMessagesService = async({ sessionId }) => {
    const messages = await chat.find({ sessionId }).sort({ createdAt: 1});

    return messages;
}


module.exports = { generateSessionName, createMessageService, getMessagesService }


