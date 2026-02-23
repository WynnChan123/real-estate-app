const { deleteSessionService, getSessionService, getSessionsService, updateSessionTitle, createSessionService } = require("../services/session.service");


const createSession = async(req, res) => {
  try{
    const userId = req.user.userId;
    if(!userId){
      return res.status(400).json({ error: 'userId is required'});
    }
    const result = await createSessionService({ userId });
    if(result.error){
      return res.status(400).json(result);
    }
    res.status(201).json({ message: 'Session created successfully'});
  }catch(error){
    res.status(500).json({ error: error.message });
  }
}

const deleteSession = async(req, res) => {
  try{
    const { sessionId } = req.params;
    const userId = req.user.userId;
    const result = await deleteSessionService({ sessionId, userId });
    if(result.error){
      return res.status(400).json(result);
    }
    res.status(200).json({ message: 'Session deleted successfully!' });
  }catch(error){
    res.status(500).json({error: error.message });
  }
}

//get side bar sessions
const getSessions = async(req, res) => {
  try{
    const userId = req.user.userId;
    if(!userId){
      return res.status(400).json({ error: 'UserId is required'});
    }

    const result = await getSessionsService({ userId });
    if(result.error){
      return res.status(400).json(result);
    }
    res.status(200).json({ message: 'Retrieved user sessions successfully!', result });
  }catch(error){
    res.status(500).json({ error: error.message });
  }
}

const getSession = async(req, res) => {
  try{
    const { sessionId } = req.params;
    if(!sessionId){
      return res.status(400).json({ error: 'SessionID is required'});
    }

    const result = await getSessionService({ sessionId });

    if(result.error){
      return res.status(400).json(result);
    }
    res.status(200).json({ message: 'Retrieved session chats successfully!', result });

  }catch(error){
    res.status(500).json({ error: error.message });
  }
}

const updateSession = async(req, res) => {
  try{
    const { sessionId } = req.params;
    const { myTitle } = req.body;
    const result = await updateSessionTitle({ sessionId, myTitle });

    if(result.error){
      return res.status(400).json(result);
    }
    res.status(200).json({ message: 'Updated session title successfully!'});
  }catch(error){
    res.status(500).json({ error: error.message });
  }
}



module.exports = { createSession, deleteSession, getSessions, getSession, updateSession };