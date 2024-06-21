
import fs from "fs";

import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";
import { loadAndNormalizeDocuments } from "./documentLoader.js";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
/* 
let client: ChromaClient | null = null;
let collection: any = null;
let isInitialized = false; */
/* 
const initializeChromaClient = async () => {
  if (!client) {
    console.log("Inicializando ChromaClient...");
    client = new ChromaClient({
      path: "http://localhost:8000",
    });

    try {
      console.log("Conectando ao ChromaDB na URL http://localhost:8000...");
      collection = await client.getOrCreateCollection({
        name: "langchain",
        embeddingFunction: new OpenAIEmbeddingFunction({
          openai_api_key: process.env.OPENAI_API_KEY as string,
        }),
      });
      console.log("Conectado ao ChromaDB e coleção 'langchain' criada/obtida.");

      await processDocuments();
      
      isInitialized = true;
    } catch (error) {
      console.error("Erro ao inicializar o ChromaClient:", error);
      throw error; // re-throw the error after logging it
    }
    
    console.log("ChromaClient inicializado.");
  }
};

const processDocuments = async () => {
  const cacheFile = "./documents/cache.json";
  let documents: { content: string }[] = [];

  if (checkCache(cacheFile)) {
    console.log("Loading from cache...");
    const cacheData = fs.readFileSync(cacheFile, "utf-8");
    documents = JSON.parse(cacheData);
  } else {
    const normalizedDocs = await loadAndNormalizeDocuments();
    documents = normalizedDocs.map((doc) => ({ content: doc }));
    console.log("Saving to cache...");
    fs.writeFileSync(cacheFile, JSON.stringify(documents), "utf-8");
  }

  console.log("Vectorizing documents...");
  await collection.add({
    documents: documents.map(doc => doc.content),
    ids: documents.map((_, idx) => `doc-${idx}`)
  });

  console.log("Documentos vetorizarizados e adicionados ao ChromaDB.");
};

const checkCache = (cacheFile: string): boolean => {
  if (fs.existsSync(cacheFile)) {
    const stats = fs.statSync(cacheFile);
    const now = new Date();
    const modifiedTime = new Date(stats.mtime);
    const cacheDuration = 24 * 60 * 60 * 1000; // 24 horas
    return now.getTime() - modifiedTime.getTime() < cacheDuration;
  }
  return false;
};

// Função para consultar o banco de dados vetorial
export const similarVectorStore = async (userQuery: string) => {
  if (!isInitialized) {
    throw new Error("A inicialização do ChromaClient não está completa.");
  }

  try {
    console.log("Consultando a coleção com a query:", userQuery);
    const results = await collection.query({
      queryTexts: [userQuery],
      nResults: 10,
    });
    console.log("Resultados da consulta:", results);

    if (results.documents && results.documents.length > 0) {
      return results.documents.map((doc: { pageContent: string }) => doc.pageContent);
    } else {
      console.log("Nenhum documento encontrado para a query:", userQuery);
      return [];
    }
  } catch (error) {
    console.error("Erro ao consultar a coleção:", error);
    throw error; // re-throw the error after logging it
  }
};

export { initializeChromaClient, isInitialized }; */

export const similarChunks = async (userQuery: string): Promise<string> => {
  const client = new ChromaClient({
    path: "http://localhost:8000"
  });
  const collection = await client.getOrCreateCollection({
    name: "langchain",
    embeddingFunction: new OpenAIEmbeddingFunction({
      openai_api_key: process.env.OPENAI_API_KEY as string,
    }),
  });

  const results = await collection.query({
    queryTexts: [userQuery],
    nResults: 10
  });

  return results.documents[0].join("\n");
};

// Função para gerar resposta do modelo OpenAI


