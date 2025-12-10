import axios from "axios";

const API_URL =
  (import.meta.env?.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) ||
  "http://127.0.0.1:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;

export type SheetsConfig = {
  sheet_url: string;
  sheet_name: string;
  owner_name: string; // mới
};

export async function getSheetsConfig(): Promise<SheetsConfig> {
  const r = await api.get("/api/sheets/config");
  return r.data;
}

export async function saveSheetsConfig(cfg: SheetsConfig): Promise<void> {
  await api.post("/api/sheets/config", cfg);
}

export async function pushSheetsNow(body?: {
  owner_name?: string;
  local_time?: string;
}): Promise<{
  ok: boolean;
  updated?: number;
  cells?: string[];
  error?: string;
  detail?: string;
  sheet?: { url: string; name: string };
  owner?: string;
}> {
  // Cho phép truyền payload (owner_name, local_time). Nếu không có, backend vẫn xử lý nhưng Time sẽ trống.
  const r = await api.post("/api/sheets/push", body || {});
  const j = r.data ?? {};
  if (r.status < 200 || r.status >= 300 || j?.ok === false) {
    throw new Error(j?.detail || j?.error || "Push fail");
  }
  return j;
}


