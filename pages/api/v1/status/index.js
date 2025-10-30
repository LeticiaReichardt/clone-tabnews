import database from "infra/database.js";
// function status(request, response) {
//   response.status(200).send("Deu certo!");
// }

async function status(request, response) {
  console.log("Request at", new Date(), request.headers["user-agent"]);
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  response.status(200).json({ chave: "Deu certo!" });
}

export default status;
