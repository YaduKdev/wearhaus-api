import jwt from "jsonwebtoken";

const SECRET_KEY = "fikh34ikfnQekwhn5lknffdhflkdflkvslkdfjdhf";

export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });

  return token;
};

export const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);

  return decodedToken.userId;
};
