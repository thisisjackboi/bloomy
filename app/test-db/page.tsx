// Test page to check database data
// Access at: http://localhost:3000/test-db

import { supabase } from "@/lib/supabase";

export default async function TestDBPage() {
  const { data, error } = await supabase
    .from("bouquets")
    .select("id, letter, created_at")
    .order("id", { ascending: false })
    .limit(5);

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Database Test - Error</h1>
        <pre className="bg-red-100 p-4 rounded">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Database Test - Recent Bouquets</h1>
      <div className="space-y-4">
        {data?.map((bouquet) => (
          <div key={bouquet.id} className="bg-gray-100 p-4 rounded">
            <p className="font-bold">ID: {bouquet.id}</p>
            <p className="text-sm text-gray-600">
              Created: {new Date(bouquet.created_at).toLocaleString()}
            </p>
            <div className="mt-2">
              <p className="font-semibold">Letter Type: {typeof bouquet.letter}</p>
              <pre className="bg-white p-2 rounded mt-1 text-xs overflow-auto">
                {JSON.stringify(bouquet.letter, null, 2)}
              </pre>
            </div>
            {typeof bouquet.letter === 'object' && bouquet.letter && (
              <div className="mt-2 bg-blue-50 p-2 rounded">
                <p className="text-sm">
                  <strong>Sender:</strong> "{bouquet.letter.sender || '(empty)'}"
                </p>
                <p className="text-sm">
                  <strong>Recipient:</strong> "{bouquet.letter.recipient || '(empty)'}"
                </p>
                <p className="text-sm">
                  <strong>Message:</strong> "{bouquet.letter.message || '(empty)'}"
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
