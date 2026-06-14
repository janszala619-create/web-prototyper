async function postJson(path, payload) {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Server returned invalid JSON.");
  }

  if (!response.ok) {
    throw new Error(data?.error || "AI request failed.");
  }

  return data;
}

export function generateWebsiteWithAI(input) {
  return postJson("/api/generate-website", input);
}

export function improveWebsiteWithAI(input) {
  return postJson("/api/improve-website", input);
}
