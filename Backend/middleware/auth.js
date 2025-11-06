import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req?.cookies?.token || '';
    
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload || !payload.id) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }
    req.userId = payload.id; 
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default auth;
