import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  //Se genera un Bearer con un token  
  let token = req.header("Authorization");
  if (!token)
    return res.status(400).send({ message: "Authorization denied: No token" });


//Split divide arreglos en este caso separa el Bearer con el token y lo guarda en un arreglo en la posición [1]
token = token.split(" ")[1];
if (!token)
  return res.status(400).send({ message: "Authorization denied: No token" });

try {
  req.user = jwt.verify(token, process.env.SK_JWT);
  next();
} catch (e) {
  return res
    .status(400)
    .send({ message: "Authorization denied: Invalid token" });
}
};
export default auth;
