import OpenAI from "openai";
import { Document } from "@langchain/core/documents";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatAi = async () => {
  const chat = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: "Hii ",
    encoding_format: "float",
  });

  console.log("chat", chat.data[0]?.embedding);
};

export const aisummeriseCommitchatGpt = async (doc: Document) => {
  const code = doc.pageContent.slice(0, 10000);

  const chat = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `
      “You are an intelligent senior software engineer who specialises in onboarding junior software engineers onto projects.
  “You are onboarding a junior software engineer and explaining to them the purpose of the ${doc.metadata.source} file. Here is the code 
  ---
      ${code}
  
  ---
  Give a summary no more than 100 words of the code above.
    `,
      },
    ],
  });
  return chat.choices[0]?.message?.content || "";
};
