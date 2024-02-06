import { Request, Response, Router } from "express";
import { setupVectorStore } from "./vectorStore";
import { loadAndNormalizeDocuments } from "./documentLoader";
import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";

import now from "performance-now";
import prisma from "../../utils/prisma";

let totalInteractions = 0;
let resolvedInteractions = 0;
let totalTimeSpent = 0;

export const router = Router();

router.post('/', async (request: Request, response: Response) => {
    const { chats } = request.body;
    const user = await prisma.user.findUnique({
        where: { id: request.user?.id },
        include: { departments: true }
    });

    if (!user) {
        return response.status(404).json({ error: 'User not found' });
    }

    const departments = user.departments.map((department) => department.department_id);

    const startTime = now();

    const normalizedDocs = await loadAndNormalizeDocuments(departments);
    const vectorStore = await setupVectorStore(normalizedDocs);

    const openai = new OpenAI({
        configuration: {
            apiKey: process.env.OPENAI_API_KEY || ''
        }
    });
    

    const chain = RetrievalQAChain.fromLLM(openai, vectorStore.asRetriever());

    console.log("Querying chain...");
    const result = await chain.call({ query: chats });

    // metricas 
    const endTime = now();
    const elapsedTime = endTime - startTime;

    totalInteractions++;
    totalTimeSpent += elapsedTime;

    if (result) {
        resolvedInteractions++;
    }

    logMetrics();

    response.json({ output: result });
});

// Função para registrar métricas
function logMetrics() {
  console.log(`Total Interactions: ${totalInteractions}`);
  console.log(`Resolved Interactions: ${resolvedInteractions}`);
  console.log(`Total Time Spent: ${totalTimeSpent} ms`);
}


router.get('/documents', authenticate, async (req, res) => {
    const user = req.user;
    let sector;
  
    if (user.sector === 'finance') {
      sector = 'finance';
    } else if (user.sector === 'hr') {
      sector = 'hr';
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }
  
    try {
      const documents = await loadAndNormalizeDocuments(sector);
      res.json(documents);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

