"use client";

import { useRouter } from "next/navigation";

export default function GroupPage() {
  const router = useRouter();
  router.push("/dashboard");

  // Todo: currently I've no idea what to do with this page.

  return null;
}