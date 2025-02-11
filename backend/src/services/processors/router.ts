import fs from "fs";
import { Request, Response, Router } from "express";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import { similarChunks } from "./vectorStore.js";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
let totalInteractions = 0;
let resolvedInteractions = 0;
let totalTimeSpent = 0;

export const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FINE_TUNED_MODEL = process.env.FINE_TUNED_MODEL || "gpt-4o-2024-05-13";

router.post("/", async (request: Request, response: Response) => {
  const { chats } = request.body;
  if (!chats) {
    return response.status(400).send("O parâmetro 'chats' é necessário.");
  }
  const startTime = performance.now();

  const promptLLM = async (userQuery: string, chunks: string): Promise<string> => {
    const model = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY as string,
      modelName: FINE_TUNED_MODEL,
    });

    const promptTemplate = ChatPromptTemplate.fromTemplate(`
      Você é a Jô, a assistente virtual que facilita informações para os colaboradores da FJS.
      Pergunta do Usuário: {query}
      {chunks}
    `);

    const formattedPrompt = await promptTemplate.format({
      query: userQuery,
      chunks: chunks,
    });

    const result = await model.invoke(formattedPrompt);
    return result.content.toString();
  };

  const history: string[] = [];
  const chatUser = async (userQuery: string): Promise<string> => {
    history.push(userQuery);
    const chunks = await similarChunks(userQuery);
    const response = await promptLLM(userQuery, chunks);
    history.push(response);
    logUserInteraction(userQuery, response);
    return response;
  };

  const logUserInteraction = (userQuery: string, botResponse: string) => {
    const logFilePath = path.join(__dirname, "./logs/consultas.log");
    const logEntry = `${new Date().toISOString()} - Pergunta do Usuário: ${userQuery}\nResposta do Bot: ${botResponse}\n\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) console.error("Erro ao gravar no arquivo de log:", err);
    });
  };

  try {
    const userResponse = await chatUser(chats);
    const endTime = performance.now();
    totalInteractions++;
    totalTimeSpent += endTime - startTime;
    if (userResponse) resolvedInteractions++;
    response.json({ output: userResponse });
  } catch (error) {
    console.error("Erro ao processar a consulta:", error.message);
    response.status(500).send("Erro ao processar a consulta.");
  }
});

// Endpoint para iniciar o fine-tuning
router.post("/fine-tune", async (req: Request, res: Response) => {
  try {
    console.log("Iniciando envio do dataset para fine-tuning...");

    const trainingFile = await openai.files.create({
      file: fs.createReadStream("./ramais_fjs_dataset.jsonl"),
      purpose: "fine-tune",
    });

    console.log("Arquivo enviado com sucesso! ID do arquivo:", trainingFile.id);

    const fineTune = await openai.fineTunes.create({
      training_file: trainingFile.id,
      model: "gpt-4o",
    });

    console.log("Fine-tuning iniciado! ID:", fineTune.id);

    res.json({ message: "Fine-tuning iniciado", fineTuneId: fineTune.id });

  } catch (error: any) {
    console.error("Erro ao iniciar fine-tuning:", error);
    res.status(500).json({ error: error.message, details: error });
  }
});


// Endpoint para verificar status do fine-tuning
router.get("/fine-tune/status/:id", async (req: Request, res: Response) => {
  try {
    const fineTuneStatus = await openai.fineTunes.retrieve(req.params.id);
    res.json(fineTuneStatus);
  } catch (error) {
    console.error("Erro ao verificar status do fine-tuning:", error.message);
    res.status(500).send("Erro ao verificar status do fine-tuning.");
  }
});
