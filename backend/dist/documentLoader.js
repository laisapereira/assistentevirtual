import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
export const loadAndNormalizeDocuments = async () => {
    const loader = new DirectoryLoader("./documents", {
        ".pdf": (path) => new PDFLoader(path),
        ".txt": (path) => new TextLoader(path),
    });
    console.log("Loading docs...");
    console.log('API Key:', process.env.OPENAI_API_KEY);
    const docs = await loader.load();
    console.log("Docs loaded.");
    return docs.map((doc) => {
        if (typeof doc.pageContent === "string") {
            return doc.pageContent;
        }
        else if (Array.isArray(doc.pageContent)) {
            return doc.pageContent.join("\n");
        }
        return "";
    }).filter(doc => doc !== "");
};
