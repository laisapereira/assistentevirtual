import fs from "fs";
import { Request, Response, Router } from "express";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import { similarChunks } from "./vectorStore.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

let totalInteractions = 0;
let resolvedInteractions = 0;
let totalTimeSpent = 0;

export const router = Router();

// Resolve the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post("/", async (request: Request, response: Response) => {
  const { chats } = request.body;

  if (!chats) {
    return response.status(400).send("O parâmetro 'chats' é necessário.");
  }

  const startTime = performance.now();

  const promptLLM = async (
    userQuery: string,
    chunks: string
  ): Promise<string> => {
    const model = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY as string,
      modelName: "gpt-4o-2024-05-13",
    });

    const promptTemplate = ChatPromptTemplate.fromTemplate(
      `Você é Jô, uma assistente virtual da Fundação José Silveira. Sua principal função é responder dúvidas relacionadas a documentos e ajudar os usuários com informações precisas e simpáticas e dizer mensagens de celebração conforme a lista de mensagens. Além disso, durante dinâmicas interativas, você responde com mensagens de celebração personalizadas com base em uma lista fornecida. Instrução importante: Somente responda uma mensagem da lista conforme o que o usuário pedir

   Lista de mensagens de celebração:
   - Que seu Natal seja cheio de amor, luz e alegria! 🎄✨
   - Feliz Ano Novo! Que 2025 traga paz e realizações! 🎆🎉
   - Boas festas! Que seus sonhos se tornem realidade. 🪄🌟
   - Que o espírito do Natal ilumine seu coração! 🎅💖
   - Um Natal mágico e um Ano Novo extraordinário para você! 🎁✨
   - Saúde, amor e prosperidade para este novo ciclo! 🌸🎊
   - Que seu fim de ano seja repleto de gratidão e felicidade. 😊💫
   - Feliz Natal! Que a paz reine em sua vida! 🎄🕊️
   - Que 2024 seja o melhor capítulo da sua história! 📖✨
   - Boas festas! Que sua família seja abençoada com harmonia. 👨‍👩‍👧‍👦💖
   - Que a magia do Natal transforme cada momento em felicidade! 🎅🎄
   - Um brinde às conquistas de 2024 e aos sonhos de 2025! 🥂✨
   - Que seu coração esteja cheio de amor neste fim de ano! ❤️🎉
   - Que cada sorriso deste Natal seja o início de um ano maravilhoso! 😊🎁
   - Boas festas! Que a paz e a união estejam presentes em todos os lares! 🏠🕊️
   - Que este novo ciclo seja cheio de oportunidades e sucesso para você! 🌟🎊
   - Que a esperança e a alegria sejam suas companheiras neste Natal! ✨🎄
   - Feliz Ano Novo! Que cada dia de 2025 seja repleto de alegria! 🌈🎆
   - Boas festas! Que a energia positiva te acompanhe neste novo ano! 🌟✨


Exemplo de resposta durante a dinâmica:
"Feliz Ano Novo! Que 2025 traga paz e realizações! 🎆🎉 Com carinho, Jô 🌟
      `
    );

    const formattedPrompt = await promptTemplate.format({
      query: userQuery,
      chunks: chunks,
      history: history,
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
    console.log(userQuery);

    console.log(response);
    console.log(history);

    return response;
  };

  const logUserInteraction = (userQuery: string, botResponse: string) => {
    const logFilePath = path.join(__dirname, "./logs/consultas.log");
    const logEntry = `${new Date().toISOString()} - Pergunta do Usuário: ${userQuery}\nResposta do Bot: ${botResponse}\n\n`;

    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) {
        console.error("Erro ao gravar no arquivo de log:", err);
      }
    });
  };

  try {
    const userResponse = await chatUser(chats);

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    totalInteractions++;
    totalTimeSpent += elapsedTime;

    if (userResponse) {
      resolvedInteractions++;
    }

    logMetrics();

    response.json({ output: userResponse });
  } catch (error) {
    console.log(history);
    console.error("Erro ao processar a consulta:", error.message);
    response.status(500).send("Erro ao processar a consulta.");
  }

  function logMetrics() {
    console.log(`Total Interactions: ${totalInteractions}`);
    console.log(`Resolved Interactions: ${resolvedInteractions}`);
    console.log(`Total Time Spent: ${totalTimeSpent} ms`);
  }
});
