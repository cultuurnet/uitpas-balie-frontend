import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Organizer, OrganizerPermissions } from '@/shared/lib/dataAccess';
import { useTranslation } from '@/shared/lib/i18n/client';
import { Spinner } from '@/ui';
import { cn } from '@/utils/shadcn';

import { NoOrganizerFallback } from './NoOrganizerFallback';
import { OrganizerSelectorRow } from './OrganizerSelectorRow';

type OrganizerSelectorProps = {
  className?: string;
  data: OrganizerPermissions[];
  filterString: string;
  isLoading: boolean;
  lastOrganizerUsed: Organizer | null;
  onSelect: (organizer: Organizer) => void;
};

const OrganizerSelector = ({
  className,
  data,
  filterString,
  isLoading,
  lastOrganizerUsed,
  onSelect,
}: OrganizerSelectorProps) => {
  const { t } = useTranslation();

  const filteredLastOrganizer = (() => {
    if (!lastOrganizerUsed || !filterString) return lastOrganizerUsed;
    const term = filterString.toLowerCase();
    const matchesName = lastOrganizerUsed.name?.toLowerCase().includes(term);
    const matchesRegion = lastOrganizerUsed.cardSystems?.some((cs) =>
      cs.name?.toLowerCase().includes(term),
    );
    return matchesName || matchesRegion ? lastOrganizerUsed : null;
  })();

  return (
    <div className={cn('overflow-y-auto', className)}>
      {isLoading ? (
        <Spinner className="mx-auto" />
      ) : (
        <ul className="flex flex-col gap-2">
          {filteredLastOrganizer && (
            <>
              <li className="flex items-center gap-2 border-b pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                <FontAwesomeIcon icon={faStar} />
                {t('organizer.lastUsed')}
              </li>
              <li className="mb-2">
                <OrganizerSelectorRow
                  organizer={filteredLastOrganizer}
                  onClick={() => onSelect(filteredLastOrganizer)}
                />
              </li>
            </>
          )}
          {data.length > 0 && (
            <>
              <li className="flex items-center gap-2 border-b pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                <FontAwesomeIcon icon={faList} />
                {t('organizer.otherOrganizers')}
              </li>
              {data.map((permission) => (
                <li key={permission.organizer.id} className="mb-2">
                  <OrganizerSelectorRow
                    organizer={permission.organizer}
                    onClick={() => onSelect(permission.organizer)}
                  />
                </li>
              ))}
            </>
          )}
          {!filteredLastOrganizer &&
            data.length === 0 &&
            (filterString ? (
              <li className="italic text-muted-foreground">
                {t('organizer.noOrganizerSearch', { searchTerm: filterString })}
              </li>
            ) : (
              <li>
                <NoOrganizerFallback />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export { OrganizerSelector };
