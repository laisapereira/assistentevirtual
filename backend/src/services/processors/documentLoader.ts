import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { OpenAIEmbeddings } from "@langchain/openai";
import * as dotenv from "dotenv";
dotenv.config();
import { Chroma } from "@langchain/community/vectorstores/chroma";

interface IDocument {
  pageContent: string | string[];
}

export const loadAndNormalizeDocuments = async (): Promise<string[]> => {
  const loader = new DirectoryLoader("./documents", {
    ".pdf": (path: string) => new PDFLoader(path),
    ".txt": (path: string) => new TextLoader(path),
  });

  console.log("Loading docs...");
  const docs: IDocument[] = await loader.load();
  console.log("Docs loaded:", JSON.stringify(docs, null, 2));

  // Normalizar o conteúdo dos documentos (strings ou arrays)
  const normalizedDocs = docs
    .map((doc: IDocument) => {
      if (typeof doc.pageContent === "string") {
        return doc.pageContent;
      } else if (Array.isArray(doc.pageContent)) {
        return doc.pageContent.join("\n");
      }
      return "";
    })
    .filter((doc) => doc !== ""); // Filtra para remover conteúdos vazios

  console.log("Normalized docs:", JSON.stringify(normalizedDocs, null, 2));

  // Dividir o conteúdo dos documentos em chunks menores
  const textSplitter = new RecursiveCharacterTextSplitter({
    separators: ["\n", ".", "!", "?", ";", " ", ""],
    chunkSize: 500,
    chunkOverlap: 70,
    lengthFunction: (str: string) => str.length,
  });

  const combinedText = normalizedDocs.join("\n");
  const documents = await textSplitter.splitText(combinedText); // Chunks gerados
  console.log("Text chunks:", JSON.stringify(documents, null, 2));

  // Preparar os chunks para serem armazenados no ChromaDB, incluindo os metadados (chunks)
  const documentsForChroma = documents.map((doc: string, index: number) => ({
    content: doc,               // O conteúdo do chunk (não necessariamente usado por Chroma, mas incluído por clareza)
    metadata: {
      chunk: doc,                // Armazena o chunk diretamente nos metadados
      source: `doc-${index + 1}`, // ID do chunk para identificação (opcional, mas recomendado)
    },
  }));

  console.log(
    "Documents for Chroma (with chunks as metadata):",
    JSON.stringify(documentsForChroma, null, 2)
  );

  
  // Armazenar os chunks e os embeddings no ChromaDB
  const vectorStores = await Chroma.fromDocuments(
    documentsForChroma, // Chunks + metadados
    new OpenAIEmbeddings(), // Embeddings gerados pelo OpenAI
    {
      collectionName: "jo-2.0-mvp", // Nome da coleção no ChromaDB
      url: "http://chromadb:8000",  // URL do servidor ChromaDB
    }
  );

  console.log("Vector store created and documents indexed with chunks.");
  return documents;
};
