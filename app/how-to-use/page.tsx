import { Header } from "@/components/Header";
import { getServerSession } from "next-auth";

export default async function HowToUse() {
  const session = await getServerSession();
  return (
    <div className="md:w-3/5 min-h-screen mx-auto">
      {session?.user && <Header />}
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="relative w-full max-w-4xl p-4 rounded-lg shadow-lg">
          <p className="text-center text-2xl font-bold pb-4">Watch Below Video</p>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-[600px] rounded-lg shadow-md"
              src="https://www.youtube.com/embed/09-QccVlvZI?rel=0&modestbranding=1&controls=0&showinfo=0&vq=hd720"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
