import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return <div className="p-3">hello {session?.user?.name}</div>;
}
