import { Request, Response, Router } from "express";
import { setupVectorStore } from "./vectorStore";
import { loadAndNormalizeDocuments } from "./documentLoader";
import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";

export const router = Router();

router.post('/', async (request: Request, response: Response) => {
    const { chats } = request.body;
    const normalizedDocs = await loadAndNormalizeDocuments();
    const vectorStore = await setupVectorStore(normalizedDocs);

    const openai = new OpenAI({
        configuration: {
            apiKey: process.env.OPENAI_API_KEY || ''
        }
    });
    

    const chain = RetrievalQAChain.fromLLM(openai, vectorStore.asRetriever());

    console.log("Querying chain...");
    const result = await chain.call({ query: chats });

    response.json({ output: result });
});
