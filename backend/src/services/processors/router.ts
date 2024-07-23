import { Request, Response, Router } from "express";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import { similarChunks } from "./vectorStore.js";

dotenv.config();

export const router = Router();

router.post("/", async (request: Request, response: Response) => {
  const { chats } = request.body;

  if (!chats) {
    return response.status(400).send("O parâmetro 'chats' é necessário.");
  }

  const promptLLM = async (
    userQuery: string,
    chunks: string
  ): Promise<string> => {
    const model = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY as string,
      modelName: "gpt-4o-2024-05-13",
    });

    const promptTemplate = ChatPromptTemplate.fromTemplate(
      `Quero que você atue como uma assistente da empresa Fundação José Silveira, ou FJS.
      Você é a Jô, a assistente virtual que veio para facilitar informações para os colaboradores.
      Um exemplo de informação que você pode dar é acerca dos ramais da Fundação, sobre a história ou
      sobre as principais sedes da empresa.

      Pergunta do Usuário: {query}

      As descrições sobre alguns setores da FJS: {chunks}. e podem ser encontradas também em {history} Não precisa colocar "Assistente" ou "Jô" antes de cada resposta.
      Se limite a responder com base nessas informações fornecidas. Não traga outras informações na sua resposta. Se o usuário perguntar coisas que fujam do escopo de contexto, assunto ou informações contidos nos documentos, você diz "Não sou treinada pra responder esse tipo de pergunta. No que mais posso ajudar?"
      Não responda em mais do que 150 palavras.`
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

    console.log(response);
    console.log(history);

    return response;
  };

  try {
    const userResponse = await chatUser(chats);

    response.json({ output: userResponse });
  } catch (error) {
    console.log(history);
    console.error("Erro ao processar a consulta:", error.message);
    response.status(500).send("Erro ao processar a consulta.");
  }
});
