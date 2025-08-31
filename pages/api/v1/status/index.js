// function status(request, response) {
//   response.status(200).send("Deu certo!");
// }

function status(request, response) {
  response.status(200).json({ chave: "Deu certo!" });
}

export default status;
