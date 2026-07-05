"use client";

import { useState, useEffect } from "react";
import { FileText, Loader2, Plus } from "lucide-react";

export default function AdminCELI() {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  
  const [newDate, setNewDate] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const fetchTests = () => {
    fetch("/api/admin/celi")
      .then(res => res.json())
      .then(data => {
        setTests(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleToggle = async (id: number, currentStatus: number) => {
    setSavingId(id);
    try {
      await fetch("/api/admin/celi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", id, isOpen: currentStatus ? 0 : 1 })
      });
      fetchTests();
    } catch (error) {}
    setSavingId(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) return;
    setIsCreating(true);
    try {
      await fetch("/api/admin/celi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", date: newDate })
      });
      setNewDate("");
      fetchTests();
    } catch (error) {}
    setIsCreating(false);
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">CELI Exams Management</h1>
          <p className="text-slate-500">Manage exam dates and inscriptions.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
        <h3 className="font-bold text-slate-800 mb-4">Add New Exam Date</h3>
        <form onSubmit={handleCreate} className="flex gap-4">
          <input 
            type="date" 
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-italy-green/20"
          />
          <button 
            type="submit" 
            disabled={isCreating || !newDate}
            className="px-6 py-2 bg-italy-green text-white font-semibold rounded-xl flex items-center gap-2 hover:bg-emerald-700 disabled:opacity-50"
          >
            {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Add Session
          </button>
        </form>
      </div>

      <div className="grid gap-4">
        {tests.map((test) => (
          <div key={test.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <FileText className="w-5 h-5 text-italy-red" />
                <h3 className="text-lg font-bold text-slate-800">{test.date}</h3>
              </div>
              <p className="text-sm text-slate-500">
                {test.currentEnrollments} Inscriptions
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${test.isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                {test.isOpen ? "OPEN" : "CLOSED"}
              </span>
              <button 
                onClick={() => handleToggle(test.id, test.isOpen)}
                disabled={savingId === test.id}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors"
              >
                {savingId === test.id ? <Loader2 className="w-4 h-4 animate-spin" /> : (test.isOpen ? "Close Inscription" : "Open Inscription")}
              </button>
            </div>
          </div>
        ))}
        {tests.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500">
            No CELI exams scheduled.
          </div>
        )}
      </div>
    </div>
  );
}
