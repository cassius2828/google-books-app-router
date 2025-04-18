// app/page.tsx  (this is a **Server Component** by default)
import { supabase } from "@/supabase/supabase";


export default async function Page() {


  const { data, error } = await supabase
    .from("users")    // any known table
    .select("id")
    .limit(1);

  return (
    <div className="p-4">
      {error ? (
        <pre className="text-red-400">Error: {error.message}</pre>
      ) : (
        <pre className="text-green-400">
          Success! Fetched: {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}