import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// import { loadAndNormalizeDocuments } from "./vectorStore.js";

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
    separators: ["\n\n", "\n", ".", "!", "?", ";", " ", ""],
    chunkSize: 200,
    chunkOverlap: 50,
    lengthFunction: (str: string) => str.length,
  });

  const combinedText = normalizedDocs.join("\n");
  const chunks = await textSplitter.splitText(combinedText);

  return chunks;
};
