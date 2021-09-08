import jwt from "jsonwebtoken";

export default async function githubAuth(req, res) {
  const { authorization } = req.headers;

  const tokenDecoded = jwt.decode(authorization);

  //Se o JWT por acaso, não conseguir decodificar o token, me retorna isAuthenticated == false
  if (!tokenDecoded) {
    return res.send({
      isAuthenticated: false,
    })
  }

  //Acesse a API do usuario passado
  const response = await fetch(
    `https://api.github.com/users/${tokenDecoded.githubUser}`
  );
  //Converta o resultado em JSON e guarde ele em (data)
  const data = await response.json();

  //Se nessa API do usuariom tiver a messagem igual a Not found ou não existir esses dados(data), me retorna isAuthenticated == false
  if (data.message === "Not Found" || !data) {
    res.send({
      isAuthenticated: false,
    });
  } else {
    res.send({
      isAuthenticated: true,
    });
  }
}