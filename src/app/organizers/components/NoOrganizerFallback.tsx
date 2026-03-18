'use client';

import { useTranslation } from '@/shared/lib/i18n/client';

const NoOrganizerFallback = () => {
  const { t } = useTranslation();

  const contactDetails = t('organizer.contact', { returnObjects: true }) as {
    name: string;
    email: string;
  }[];

  return (
    <>
      <p className="italic text-muted-foreground">
        {t('organizer.noOrganizerP1')}
      </p>
      <p className="mb-4 italic text-muted-foreground">
        {t('organizer.noOrganizerP2')}
      </p>
      <ul className="mb-8 flex flex-col gap-1">
        {contactDetails.map((contact) => (
          <li key={contact.name}>
            <strong>{contact.name}</strong>{' '}
            <a href={`mailto:${contact.email}`} className="underline">
              {contact.email}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export { NoOrganizerFallback };
