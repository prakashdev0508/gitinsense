import Image from "next/image";
import ProjectNot from "public/images/projNot.png";

export default function NotFound() {
  return (
    <div className="flex min-h-[96] items-center justify-center px-4">
      <div>
        <Image alt="not found " src={ProjectNot} />
        <div className="text-center text-2xl font-bold">Project not found </div>
      </div>
    </div>
  );
}
