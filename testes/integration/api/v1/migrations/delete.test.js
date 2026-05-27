test("DELETE to /api/v1/migrations should return 200", async () => {
  // const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
  //   method: "DELETE",
  // });
  const response = await fetch(
    " https://clone-tabnews-git-fix-migrati-461f1e-leticiareichardts-projects.vercel.app/api/v1/migrations",
    {
      method: "DELETE",
      headers: {
        "x-vercel-protection-bypass": "esseNda",
      },
    },
  );

  console.log(response);

  for (let index = 0; index < 100; index++) {
    // await fetch("http://localhost:3000/api/v1/migrations", {
    //   method: "DELETE",
    // });
    await fetch(
      " https://clone-tabnews-git-fix-migrati-461f1e-leticiareichardts-projects.vercel.app/api/v1/migrations",
      {
        method: "DELETE",
        headers: {
          "x-vercel-protection-bypass": "esseNaoDa",
        },
      },
    );
  }
  console.log("Teste de DELETE executado");
  // console.log(response1);
});
