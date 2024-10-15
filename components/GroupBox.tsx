"use client";

import { useRouter } from "next/navigation";

const GroupBox = ({
  text,
  groupId,
}: {
  text: string;
  groupId: string
}) => {
  const router = useRouter();
  return (
    <div
      className="group w-full h-48 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1"
      role="button"
      aria-label={`Group ${text}`}
      onClick={() => {
        router.push(`groups/${text}/${groupId}`);
      }}
    >
      <div className="w-full h-full flex items-center justify-center transition-opacity duration-300 group-hover:opacity-90">
        <span className="text-white text-xl font-bold">{text}</span>
      </div>
    </div>
  );
};

export { GroupBox };
