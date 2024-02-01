export interface ChatEntry {
  type: "user" | "bot";
  message: string;
  profilePic: string; // Altere para o tipo apropriado da URL da imagem
}