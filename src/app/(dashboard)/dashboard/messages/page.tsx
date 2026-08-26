import { getContactMessages } from '@/lib/db/queries';
import { MessagesInbox, type DashboardMessage } from '@/components/dashboard/messages-inbox';

export const dynamic = 'force-dynamic';

export default async function DashboardMessagesPage() {
  const rawMessages = await getContactMessages();

  const formattedMessages: DashboardMessage[] = rawMessages.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    subject: m.subject,
    message: m.message,
    read: m.read,
    createdAt: m.createdAt.toISOString(),
  }));

  return <MessagesInbox initialMessages={formattedMessages} />;
}
