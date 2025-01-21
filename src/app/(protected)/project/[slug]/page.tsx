import AskQuestion from "@/components/projects/AskQuestion";
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
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-3">
          <AskQuestion />
        </div >
      </div>
      <hr className="my-8" />
      <CommitsPage projectId={slug} />
    </div>
  );
}
