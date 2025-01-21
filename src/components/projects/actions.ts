"use server";

import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateEmbedding } from "@/lib/chatgpt";
import { indexGithubRepo, loadGithubRepo } from "@/lib/github-loader";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const askQuestion = async (
  question: string,
  projectId: string,
  githubUrl: string,
) => {
  try {
    // const stream = createStreamableValue();
    const queryVector = await generateEmbedding(question);
    const questionVectoryQuery = `[${queryVector.join(",")}]`;

    const getprojectSourceEmbedding = await indexGithubRepo( projectId , githubUrl);


    // const sourcecodeEmbadding = `[${getprojectSourceEmbedding?.join(",")}]`;


    // (async () => {
    //   const { textStream } = await streamText({
    //     model: google("gemini-1.5-pro"),
    //     prompt: `You are a code assistant who answers questions about the codebase. Your target audience is a technical intern who is looking to understand the codebase.
        
    //     AI assistant is a brand new, powerful, human-like artificial intelligence. The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        
    //     AI is a well-behaved and well-mannered individual. AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
        
    //     AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
        
    //     If the question is asking about code or a specific file, AI will provide the detailed answer, giving step-by-step instructions, including code snippets.
        
    //     START CONTEXT BLOCK
    //     ${sourcecodeEmbadding}
    //     END OF CONTEXT BLOCK.
        
    //     START QUESTION
    //     ${questionVectoryQuery}
    //     END OF QUESTION
    //     `,
    //   });

    //   for await (const dalta of textStream) {
    //     stream.update(dalta);
    //   }
    //   stream.done();
    // })();
    return { output: "Done" };


  } catch (error) {
    console.log(error)
    throw new Error("Something went wrong please try again" );
  }
};
