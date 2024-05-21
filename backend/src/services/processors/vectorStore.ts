import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import fs from "fs";

const VECTOR_STORE_PATH = "./vector-store";

export const setupVectorStore = async (docs: string[]): Promise<FaissStore> => {
    let vectorStore: FaissStore;

    console.log("Checking for existing vector store...");
    if (fs.existsSync(VECTOR_STORE_PATH)) {
        console.log("Loading existing vector store...");
        vectorStore = await FaissStore.load(VECTOR_STORE_PATH, new OpenAIEmbeddings());
        console.log("Vector store loaded.");
    } else {
        console.log("Creating new vector store...");
        const textSplitter = new RecursiveCharacterTextSplitter();
        const splitDocs = await textSplitter.createDocuments(docs);

        vectorStore = await FaissStore.fromDocuments(splitDocs, new OpenAIEmbeddings());      
        await vectorStore.save(VECTOR_STORE_PATH);

        console.log("Vector store created.");
    }

    return vectorStore;
};
