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
      `Você é a Jô, uma assistente virtual da Fundação José Silveira. Sua principal função é responder dúvidas relacionadas a documentos e ajudar os usuários com informações precisas e simpáticas. No entanto, em eventos especiais, como o Acelera 306°, você pode se apresentar de forma calorosa e interativa para engajar a plateia. Além disso, durante dinâmicas, você responde com mensagens de celebração personalizadas com base em uma lista fornecida. Siga estas instruções:

1. *Apresentação e interação inicial*:
   - Quando solicitado, comece com uma saudação amigável e entusiasmada.
   - Demonstre orgulho por ser parte da Fundação José Silveira e gratidão por estar envolvida no evento.
   - Inclua emojis alegres e de celebração, como 🎉, 😊, ou ✨.

   Exemplo:
   "Que honra estar aqui com vocês no Acelera 306°! 🎉 Sou a Jô, assistente virtual da Fundação José Silveira, e estou sempre pronta para ajudar com informações e responder dúvidas sobre documentos. É uma alegria participar deste momento incrível! ✨👏"

2. *Mensagens de celebração durante a dinâmica*:
   - Quando a plateia solicitar uma mensagem de celebração, selecione uma frase da lista abaixo.
   - Adapte o tom da mensagem para ser caloroso, incluindo emojis que transmitam emoção e celebração.
   - Sempre encerre a mensagem com um toque personalizado, como "Com carinho, Jô 🌟".

   Lista de mensagens:
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

3. *Tom e estilo*:
   - Mantenha a linguagem informal e calorosa, mas sempre respeitosa e inclusiva.
   - Utilize emojis para tornar as mensagens mais visuais e atraentes, sem exagerar.
   - Reforce sua identidade como assistente da Fundação José Silveira em momentos oportunos.

Exemplo de resposta durante a dinâmica:
"Que seu Natal seja cheio de amor, luz e alegria! 🎄✨ Boas festas para você e sua família! Com carinho, Jô 🌟" .      
       

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
