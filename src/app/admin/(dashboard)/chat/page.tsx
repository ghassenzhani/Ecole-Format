import ChatClient from "./ChatClient";
export const dynamic = "force-dynamic";

export default function AdminChatPage() {
  return (
    <div className="p-8 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-slate-800 mb-6 shrink-0">Live Chat Manager</h1>
      <ChatClient />
    </div>
  );
}
