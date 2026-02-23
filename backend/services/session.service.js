const session = require('../models/sessionModel');
const chat = require('../models/messageModel');

const createSessionService = async ({ userId }) => {
  const newSession = new session({
    userId,
    title: 'New Chat',
  });
  await newSession.save();
  return { message: 'New session created successfully', newSession };
};

const deleteSessionService = async ({ sessionId, userId }) => {
  const thisSession = await session.findById(sessionId);
  if (!thisSession) {
    return { error: 'Session not found' };
  }

  if (thisSession.userId.toString() !== userId) {
    return { error: 'Unauthorized' };
  }
  await session.findByIdAndDelete(sessionId);
};

const getSessionsService = async ({ userId }) => {
  const sessions = await session.find({ userId })
    .sort({ created_at : -1 })

  return { message: 'Got all sessions successfully', sessions };
}

const getSessionService = async ({ sessionId }) => {
  const thisSession = await session.findById(sessionId);
  const chats = await chat.find({ sessionId }).sort({ created_at: 1 });

  return { message: 'Got session successfully', session: thisSession , chats };
}

const updateSessionTitle = async({ sessionId, myTitle }) => {
  const updatedSession = await session.findByIdAndUpdate(sessionId, {
    title: myTitle
  },
  {
    new: true
  });

  return { message: 'Session title updated successfully', session: updatedSession }
}


module.exports = { createSessionService, deleteSessionService, getSessionsService, getSessionService, updateSessionTitle };
