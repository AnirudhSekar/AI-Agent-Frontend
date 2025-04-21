'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Summary from '@/components/Summary';
import AgentReply from "@/components/AgentReply";
import { useState } from 'react';
const inboxData = [
        {
            "from": "john@example.com",
            "subject": "Meeting Reminder",
            "body": "Just a reminder that we have a meeting on 2025-05-01 at 3 PM."
        },
        {
            "from": "jane@example.com",
            "subject": "Project Update",
            "body": "The frontend of the website has been updated and pushed to GitHub."
        }
    ]

export default function HomePage() {
  const { data: session, status } = useSession();
  const [sendEmails, setSendEmails] = useState(false); // This should be set based on your logic
  if (status === 'loading') {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Welcome to Smart Agent</h1>
        <p className="mb-6 text-gray-700">Please sign in to continue</p>
        <button
          onClick={() => signIn('google')}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Hi, {session.user.name} 👋</h1>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Sign out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Summary />
        <AgentReply inbox={inboxData} sendEmails={sendEmails} />
       </div>
    </div>
  );
}
