'use client';

import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useCounter } from '@/hooks/useCounter';
import { Organizer, OrganizerPermissions } from '@/shared/lib/dataAccess';
import { useTranslation } from '@/shared/lib/i18n/client';
import { Card, CardContent } from '@/ui';
import { Spinner } from '@/ui';

import { CounterFallback } from './CounterFallback';
import { CounterSelectorRow } from './CounterSelectorRow';

type CounterSelectorProps = {
  data: OrganizerPermissions[];
  filterString: string;
  isLoading: boolean;
  onSelect: (organizer: Organizer) => void;
};

const CounterSelector = ({
  data,
  filterString,
  isLoading,
  onSelect,
}: CounterSelectorProps) => {
  const { t } = useTranslation();
  const { lastCounterUsed } = useCounter();

  return (
    <Card className="overflow-y-auto">
      <CardContent>
        {isLoading ? (
          <Spinner className="mx-auto" />
        ) : (
          <ul className="flex flex-col gap-2">
            {lastCounterUsed && (
              <>
                <li className="flex items-center gap-2 border-b pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <FontAwesomeIcon icon={faStar} />
                  {t('counter.lastUsed')}
                </li>
                <li>
                  <CounterSelectorRow
                    organizer={lastCounterUsed}
                    onClick={() => onSelect(lastCounterUsed)}
                  />
                </li>
              </>
            )}
            {data.length > 0 ? (
              <>
                <li className="flex items-center gap-2 border-b pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <FontAwesomeIcon icon={faList} />
                  {t('counter.otherCounters')}
                </li>
                {data.map((permission) => (
                  <li key={permission.organizer.id}>
                    <CounterSelectorRow
                      organizer={permission.organizer}
                      onClick={() => onSelect(permission.organizer)}
                    />
                  </li>
                ))}
              </>
            ) : filterString ? (
              <li className="italic text-muted-foreground">
                {t('counter.noCounterSearch', { searchTerm: filterString })}
              </li>
            ) : (
              <li>
                <CounterFallback />
              </li>
            )}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export { CounterSelector };
