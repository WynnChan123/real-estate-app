const { loginUser, registerUser } = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await registerUser({ username, email, password });
    if (result.error) {
      return res.status(400).json(result);
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    if(result.error){
      return res.status(400).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
