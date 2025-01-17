import CommitsPage from "@/components/projects/CommitsPage";
import { pollCommits } from "@/lib/githubData";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <div className="px-4">
      <CommitsPage projectId={slug} />
    </div>
  );
}
