import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
/* import { DirectoryLoader } from "@langchain/community/document_loaders/fs/pdf" */
import { TextLoader } from "langchain/document_loaders/fs/text";
import { OpenAIEmbeddings } from "@langchain/openai";

import { Chroma } from "@langchain/community/vectorstores/chroma";

// import { loadAndNormalizeDocuments } from "./vectorStore.js";

interface IDocument {
  pageContent: string | string[];
}

export const loadAndNormalizeDocuments = async (): Promise<string[]> => {
  const loader = new DirectoryLoader("./app/documents", {
    ".pdf": (path: string) => new PDFLoader(path),
    ".txt": (path: string) => new TextLoader(path),
  });

  console.log("Loading docs...");
  const docs: IDocument[] = await loader.load();
  console.log("Docs loaded.");

  const normalizedDocs = docs
    .map((doc: IDocument) => {
      if (typeof doc.pageContent === "string") {
        return doc.pageContent;
      } else if (Array.isArray(doc.pageContent)) {
        return doc.pageContent.join("\n");
      }
      return "";
    })
    .filter((doc) => doc !== "");

  const textSplitter = new RecursiveCharacterTextSplitter({
    separators: [".", "!", "?", ";", " ", ""],
    chunkSize: 200,
    chunkOverlap: 50,
    lengthFunction: (str: string) => str.length,
  });

  const combinedText = normalizedDocs.join("\n");
  const documents = await textSplitter.splitText(combinedText);

  const documentsForChroma = documents.map((doc: string) => ({
    content: doc,
    pageContent: doc,
    metadata: {},
  }));

  const database = Chroma.fromDocuments(documentsForChroma, new OpenAIEmbeddings(), {
    collectionName: "jo-langchain",
    url: "http://chromadb:8000",
  });

  return documents;
};
