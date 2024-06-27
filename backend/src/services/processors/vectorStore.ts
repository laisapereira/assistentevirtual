import fs from "fs";

import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";
import { loadAndNormalizeDocuments } from "./documentLoader.js";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export const similarChunks = async (userQuery: string): Promise<string> => {
  const client = new ChromaClient({
    path: "http://chromadb:8000",
  });
  const collection = await client.getOrCreateCollection({
    name: "jo-langchain",
    embeddingFunction: new OpenAIEmbeddingFunction({
      openai_api_key: process.env.OPENAI_API_KEY as string,
    }),
  });

  const results = await collection.query({
    queryTexts: [userQuery],
    nResults: 10,
  });

  return results.documents[0].join("\n");
};

// Função para gerar resposta do modelo OpenAI
