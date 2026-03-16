import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Organizer, OrganizerPermissions } from '@/shared/lib/dataAccess';
import { useTranslation } from '@/shared/lib/i18n/client';
import { Counter } from '@/store/counterStore';
import { Spinner } from '@/ui';
import { cn } from '@/utils/shadcn';

import { CounterFallback } from './CounterFallback';
import { CounterSelectorRow } from './CounterSelectorRow';

type CounterSelectorProps = {
  className?: string;
  data: OrganizerPermissions[];
  filterString: string;
  isLoading: boolean;
  lastCounterUsed: Counter;
  onSelect: (organizer: Organizer) => void;
};

const CounterSelector = ({
  className,
  data,
  filterString,
  isLoading,
  lastCounterUsed,
  onSelect,
}: CounterSelectorProps) => {
  const { t } = useTranslation();

  const filteredLastCounter = (() => {
    if (!lastCounterUsed || !filterString) return lastCounterUsed;
    const term = filterString.toLowerCase();
    const matchesName = lastCounterUsed.name?.toLowerCase().includes(term);
    const matchesRegion = lastCounterUsed.cardSystems?.some((cs) =>
      cs.name?.toLowerCase().includes(term),
    );
    return matchesName || matchesRegion ? lastCounterUsed : null;
  })();

  return (
    <div className={cn('overflow-y-auto', className)}>
      {isLoading ? (
        <Spinner className="mx-auto" />
      ) : (
        <ul className="flex flex-col gap-2">
          {filteredLastCounter && (
            <>
              <li className="flex items-center gap-2 border-b pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                <FontAwesomeIcon icon={faStar} />
                {t('counter.lastUsed')}
              </li>
              <li className="mb-2">
                <CounterSelectorRow
                  organizer={filteredLastCounter}
                  onClick={() => onSelect(filteredLastCounter)}
                />
              </li>
            </>
          )}
          {data.length > 0 && (
            <>
              <li className="flex items-center gap-2 border-b pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                <FontAwesomeIcon icon={faList} />
                {t('counter.otherCounters')}
              </li>
              {data.map((permission) => (
                <li key={permission.organizer.id} className="mb-2">
                  <CounterSelectorRow
                    organizer={permission.organizer}
                    onClick={() => onSelect(permission.organizer)}
                  />
                </li>
              ))}
            </>
          )}
          {!filteredLastCounter &&
            data.length === 0 &&
            (filterString ? (
              <li className="italic text-muted-foreground">
                {t('counter.noCounterSearch', { searchTerm: filterString })}
              </li>
            ) : (
              <li>
                <CounterFallback />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export { CounterSelector };
