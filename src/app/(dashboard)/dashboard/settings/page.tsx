import { getSiteSettings } from '@/lib/db/queries';
import { SettingsForm } from '@/components/dashboard/settings-form';

export const dynamic = 'force-dynamic';

export default async function DashboardSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <SettingsForm
      initialSettings={
        settings
          ? {
              labFullName: settings.labFullName,
              labShortName: settings.labShortName,
              tagline: settings.tagline,
              missionStatement: settings.missionStatement,
              address: settings.address ?? undefined,
              contactEmail: settings.contactEmail ?? undefined,
              phone: settings.phone ?? undefined,
              heroImageUrl: settings.heroImageUrl ?? undefined,
            }
          : null
      }
    />
  );
}
