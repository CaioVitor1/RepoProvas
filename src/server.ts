import app from "./index"

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
    console.log(`Server com TS rodando na porta: ${PORT}`);
  });
  