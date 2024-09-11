import express, { Express } from "express";
import dotenv from "dotenv";
import { setupExpress } from "./expressConfig.js";
import { router } from "./router.js";
import cookieParser from "cookie-parser";
import { loadAndNormalizeDocuments } from "./documentLoader.js";

dotenv.config();

const app: Express = express();
const port: number = 9000;
app.use(cookieParser());

try {
  await loadAndNormalizeDocuments();
  console.log("Documentos carregados e normalizados.");
} catch (error) {
  console.error("Erro ao carregar e normalizar documentos:", error.message);
  throw error;
}

setupExpress(app);
app.use(router);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
