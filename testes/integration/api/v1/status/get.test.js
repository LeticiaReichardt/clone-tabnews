test("GET to /api/v1/status shold retuen 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  const parsedUpedatedAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpedatedAt);
  expect(responseBody.dependencies.database.version).toEqual("16.11");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});

// test.only("injection", async () => {
//   const response = await fetch(
//     "http://localhost:3000/api/v1/status?databaseName=local_db",
//   );
// });
