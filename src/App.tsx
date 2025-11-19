import { useLiveData } from "./hooks/useLiveData";
import "./index.scss";
import SetIntervalControl from "./components/SetInterval";
import FullTriggerTable from "./components/FullTriggerTable";
import { useState } from "react";

export default function App() {
  const { data, isLoading, error } = useLiveData();
  const [apiBase, setApiBase] = useState(() => {
    if (typeof window === "undefined") return "";
    return (
      window.localStorage.getItem("receiver_api_base") || window.location.origin
    );
  });

  const saveApiBase = () => {
    const next = apiBase.trim();
    if (typeof window !== "undefined" && next) {
      window.localStorage.setItem("receiver_api_base", next);
      window.location.reload();
    }
  };

  return (
    <div className="mx-auto max-w-[1900px] p-4 space-y-6">
      {/* HEADER + REFRESH + API BASE */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-700/60 pb-3">
        {/* Left: Title */}
        <h2 className="text-2xl font-bold">Receiver Dashboard</h2>

        {/* Right: API Base + Refresh */}
        <div className="flex flex-wrap items-center gap-3">
          {/* API BASE INPUT */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide">
            <span>API Base</span>
            <input
              value={apiBase}
              onChange={(e) => setApiBase(e.target.value)}
              className="rounded bg-neutral-900/70 px-2 py-1 text-[12px] lowercase w-[250px]
             border border-neutral-600 focus:border-violet-500 outline-none"
              placeholder="https://example.trycloudflare.com"
            />

            <button
              onClick={saveApiBase}
              className="rounded bg-violet-600 px-3 py-1 text-[11px] font-semibold"
            >
              Apply
            </button>
          </div>

          {/* REFRESH CONTROL */}
          <SetIntervalControl />
        </div>
      </div>

      {/* STATUS */}
      {isLoading && <div className="text-neutral-400 text-xs">Loading...</div>}
      {error && <div className="text-red-400 text-xs">Load lỗi</div>}

      {/* MAIN TABLES */}
      {data && (
        <>
          <div>
            <h3 className="text-sm font-semibold mb-2 text-neutral-200">
              Bảng kèo hiện tại
            </h3>
            <FullTriggerTable rows={data.live} disableSound={false} />
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2 mt-6 text-neutral-200">
              Bảng kèo cũ
            </h3>
            <FullTriggerTable rows={data.old} disableSound={true} isOld />
          </div>
        </>
      )}
    </div>
  );
}
