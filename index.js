const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Express server started on http://localhost:${PORT}`)
);
