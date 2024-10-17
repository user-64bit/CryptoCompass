import { Header } from "@/components/Header";
import { getServerSession } from "next-auth";

export default async function HowToUse() {
  const session = await getServerSession();
  return (
    <div className="md:w-3/5 min-h-screen mx-auto">
      {session?.user && <Header />}
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        TODO : Write small documentation to explain how to do things...
      </div>
    </div>
  );
}
