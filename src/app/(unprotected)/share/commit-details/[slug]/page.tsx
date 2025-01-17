import { verifyToken } from "@/utils/jwtTokens";
import ShareCommitDetails from "./ShareCommitDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <div className="px-4">
      <ShareCommitDetails slug={slug} />
    </div>
  );
}
