import { lazy, Suspense, useCallback, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CopilotLauncher } from "./CopilotLauncher";
import { useCopilot } from "@/hooks/useCopilot";

/**
 * Copilot — global mount point. Owns only panel open/close; all conversation
 * and AI streaming logic lives in the useCopilot hook (no business logic here).
 * The panel (and its Markdown renderer) is code-split and loaded on first open,
 * so the markdown dependency never ships in the initial page bundle.
 */
const CopilotPanel = lazy(() =>
  import("./CopilotPanel").then((m) => ({ default: m.CopilotPanel })),
);

export function Copilot() {
  const [open, setOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const chat = useCopilot();

  console.log("[DEBUG] Copilot()", { open, configured: chat.configured, status: chat.status });

  const openPanel = useCallback(() => {
    console.log("[DEBUG] Copilot openPanel()");
    setOpen(true);
  }, []);
  const minimize = useCallback(() => setOpen(false), []); // preserves the conversation
  const close = useCallback(() => {
    console.log("[DEBUG] Copilot close()");
    setOpen(false);
    chat.clear(); // closing ends the session and resets to a fresh welcome
  }, [chat]);

  return (
    <>
      <CopilotLauncher ref={launcherRef} open={open} onOpen={openPanel} />
      <AnimatePresence>
        {open && (
          <Suspense fallback={null}>
            <CopilotPanel
              messages={chat.messages}
              status={chat.status}
              error={chat.error}
              followups={chat.followups}
              onSend={chat.send}
              onRetry={chat.retry}
              onStop={chat.stop}
              onClear={chat.clear}
              onMinimize={minimize}
              onClose={close}
              returnFocusRef={launcherRef}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
}
