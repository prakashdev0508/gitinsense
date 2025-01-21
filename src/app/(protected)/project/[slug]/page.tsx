import CommitsPage from "@/components/projects/CommitsPage";
import ProjectPage from "./ProjectPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <div className="px-4">
      <ProjectPage projectId={slug} />
      <div className="my-8" />
      <CommitsPage projectId={slug} />
    </div>
  );
}
