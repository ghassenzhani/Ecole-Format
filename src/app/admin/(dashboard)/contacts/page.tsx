import { db } from "@/db";
import { contacts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Mail, Phone, Calendar, User, AlignLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const allContacts = await db
    .select()
    .from(contacts)
    .orderBy(desc(contacts.createdAt));

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Contact Messages</h1>
        <p className="text-slate-500 mt-2">
          Review messages submitted from the contact page.
        </p>
      </div>

      <div className="grid gap-6">
        {allContacts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              No messages yet
            </h3>
            <p className="text-sm text-slate-500">
              When someone submits the contact form, it will appear here.
            </p>
          </div>
        ) : (
          allContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-italy-green" />
                    <h3 className="text-lg font-bold text-slate-900">
                      {contact.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="hover:text-italy-green transition-colors"
                      >
                        {contact.email}
                      </a>
                    </div>
                    {contact.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <a
                          href={`tel:${contact.phone}`}
                          className="hover:text-italy-green transition-colors"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {new Date(contact.createdAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                  </div>
                </div>
                {contact.subject && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 whitespace-nowrap self-start">
                    Subject: {contact.subject}
                  </span>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex gap-2">
                  <AlignLeft className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
                    {contact.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
