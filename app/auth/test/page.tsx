import { notFound } from "next/navigation";
import { connectDB } from "@/app/_lib/db";
import { UserModel } from "@/app/_lib/models";

export default async function Page() {
  if (process.env.NODE_ENV !== "development") notFound();

  try {
    await connectDB();
    const user = await UserModel.findOne().select("_id").lean();
    return (
      <div className="p-4">
        <pre className="text-green-400">
          MongoDB connected! Sample: {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    );
  } catch (err) {
    return (
      <div className="p-4">
        <pre className="text-red-400">
          Error: {err instanceof Error ? err.message : String(err)}
        </pre>
      </div>
    );
  }
}
