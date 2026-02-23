const { generateSessionName, createMessageService, getMessagesService } = require("../services/chat.service");

const createTitle = async (req, res) => {
  try{
    const { sessionId, content } = req.body;
    const result = await generateSessionName({ sessionId, content });
    if(result.error){
      return res.status(400).json(result);
    }
    res.status(201).json(result);
  }catch (error){
    res.status(500).json({ error: error.message })
  }
}

const createMessage = async(req, res) => {
  try{
    const { sessionId, content } = req.body;
    const userId = req.user.userId;
    if(!userId || !sessionId || !content){
      return res.status(400).json({ error: 'UserID, SessionID and content are required'});
    }
    const result = await createMessageService({ userId, sessionId, content});
    if(result.error){
      return res.status(400).json(result);
    }
    res.status(201).json(result);
  }catch(error){
    res.status(500).json({ error: error.message })
  }
}

const getMessages = async(req, res) => {
  try{
    const { sessionId } = req.params;
    if(!sessionId){
      return res.status(400).json({ error: 'sessionId is required'});
    }

    const result = await getMessagesService({ sessionId });
    if(result.error){
      return res.status(400).json(result);
    }
    res.status(200).json(result);
  }catch(error){
    res.status(500).json({ error: error.message })
  }
}



module.exports = { createTitle, createMessage, getMessages }