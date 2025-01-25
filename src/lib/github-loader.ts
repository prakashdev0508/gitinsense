import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";
import { generateEmbedding, summeriseCode } from "./chatgpt";
import { db } from "@/server/db";
import PQueue from "p-queue";

export const loadGithubRepo = async (
  githubUrl: string,
  githubToken?: string,
) => {
  try {
    const loader = new GithubRepoLoader(githubUrl, {
      accessToken: githubToken || process.env.GITHUB_TOKEN,
      branch: "main",
      ignoreFiles: [
        ".git/",
        ".gitignore",
        ".gitattributes",
        ".github/",
        "package.json",
        "package-lock.json",
        "yarn.lock",
        "pnpm-lock.yml",
        "bun.lockb",
        "build/",
        "out/",
        "target/",
        "node_modules/",
        "*.tmp",
        "*.log",
        ".DS_Store",
        "Thumbs.db",
        "README.md",
        "CONTRIBUTING.md",
        "LICENSE",
        ".next",
        "*.test.js",
        "*.spec.js",
        "__tests__/",
        "coverage/",
        ".vscode/",
        ".idea/",
        ".editorconfig",
        ".env",
        ".env.local",
        ".env.production",
        ".env.development",
        ".eslintrc",
        ".prettierrc",
        ".eslintignore",
        ".prettierignore",
        ".nvmrc",
        "Makefile",
        "CMakeLists.txt",
      ],
      recursive: true,
      unknown: "warn",
      maxConcurrency: 5,
    });

    const docs = await loader.load();
    return docs;
  } catch (error) {
    throw new Error("Error loading github files ");
  }
};

export const indexGithubRepo = async (
  projectId: string,
  githubUrl: string,
  githubToken?: string,
) => {
  const docs = await loadGithubRepo(githubUrl, githubToken);
  const allEmbeddings = await getEmbaddings(docs);

  await Promise.allSettled(
    allEmbeddings.map(async (embedding, index) => {
      if (!embedding.sourceCode || !embedding.summary) return;

      console.log("summ", embedding.summary);

      const sourceCodeEmbedding = await db.sourceCodeEmbeddings.upsert({
        where: {
          fileName: embedding.fileName,
        },
        create: {
          fileName: embedding.fileName,
          sourceCode: embedding.sourceCode,
          summery: embedding.summary,
          projectId: projectId,
        },
        update: {
          sourceCode: embedding.sourceCode,
          summery: embedding.summary,
        },
      });

      await db.$executeRaw`
      UPDATE "SourceCodeEmbeddings" SET "summeryVector" = ${embedding.embedding} :: vector
      WHERE "id" = ${sourceCodeEmbedding.id}
      `;
    }),
  );
};

interface Embedding {
  summary: string;
  fileName: string;
  embedding: any; // Replace `any` with the actual type if known
  sourceCode: string;
}

export const getEmbaddings = async (docs: Document[]) => {
  const queue = new PQueue({ concurrency: 5 });
  const embeddings: Embedding[] = [];

  await Promise.all(
    docs.map((doc) =>
      queue.add(async () => {
        const summary = await summeriseCode(doc);
        const embedding = await generateEmbedding(summary);
        console.log("Summertttt" , summary)
        if (summary && embedding && summary != "Error summarizing code.") {
          embeddings.push({
            summary,
            fileName: doc.metadata.source,
            embedding,
            sourceCode: JSON.stringify(doc.pageContent),
          });
        }
      }),
    ),
  );

  return embeddings;
};
