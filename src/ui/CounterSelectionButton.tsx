'use client';

import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChevronsUpDown, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { useIsMobile } from '@/hooks/use-mobile';
import { Organizer, OrganizerPermissions } from '@/shared/lib/dataAccess';
import { useTranslation } from '@/shared/lib/i18n/client';
import { Counter } from '@/store/counterStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/shadcn/dropdown-menu';
import { Input } from '@/ui/shadcn/input';
import { SidebarMenuButton } from '@/ui/SidebarMenuButton';

const SEARCH_THRESHOLD = 5;

type Props = {
  activeCounter: Counter;
  counters: OrganizerPermissions[];
  lastCounterUsed: Counter;
  requestAccessHref: string;
  totalCounters: number;
  onSelect: (organizer: Organizer) => void;
};

const CounterSelectionButton = ({
  activeCounter,
  counters,
  lastCounterUsed,
  requestAccessHref,
  totalCounters,
  onSelect,
}: Props) => {
  const [search, setSearch] = useState('');
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const showSearch = totalCounters > SEARCH_THRESHOLD;

  const matchesTerm = (name?: string, cardSystems?: { name?: string }[]) => {
    const term = search.toLowerCase();
    return (
      name?.toLowerCase().includes(term) ||
      cardSystems?.some((cs) => cs.name?.toLowerCase().includes(term))
    );
  };

  const filteredLastCounter =
    search && lastCounterUsed
      ? matchesTerm(lastCounterUsed.name, lastCounterUsed.cardSystems)
        ? lastCounterUsed
        : null
      : lastCounterUsed;

  const filteredCounters = search
    ? counters.filter(({ organizer }) =>
        matchesTerm(organizer.name, organizer.cardSystems),
      )
    : counters;

  const hasResults = !!filteredLastCounter || filteredCounters.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="mt-2 h-auto items-center justify-between gap-2 rounded-lg border border-neutral-400 bg-neutral-300 px-3.5 py-3 transition-all duration-150 hover:border-[#bdbdbd] hover:bg-neutral-200 hover:text-inherit">
          <div className="flex flex-col items-start">
            <span className="font-semibold">{activeCounter?.name}</span>
            <span className="text-xs text-muted-foreground">
              {activeCounter?.cardSystems?.[0]?.name}
            </span>
          </div>
          <ChevronsUpDown className="shrink-0" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]" side={isMobile ? 'bottom' : 'right'} align="start" avoidCollisions={false}>
        {showSearch && (
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-8"
                placeholder="Zoeken..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
        {hasResults && (
          <>
            <DropdownMenuLabel>Kies een balie</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <div className="max-h-[calc(10*2.5rem)] overflow-y-auto">
          {!hasResults && (
            <p className="px-3 py-2 text-sm italic text-muted-foreground">
              {t('counter.noCounterSearch', { searchTerm: search })}
            </p>
          )}
          {filteredLastCounter && (
            <DropdownMenuItem onClick={() => onSelect(filteredLastCounter)}>
              <div className="flex flex-col">
                <span>{filteredLastCounter.name}</span>
                <span className="text-xs text-muted-foreground">
                  {filteredLastCounter.cardSystems?.[0]?.name}
                </span>
              </div>
            </DropdownMenuItem>
          )}
          {filteredCounters.map((permission) => (
            <DropdownMenuItem
              key={permission.organizer.id}
              onClick={() => onSelect(permission.organizer)}
            >
              <div className="flex flex-col">
                <span>{permission.organizer.name}</span>
                <span className="text-xs text-muted-foreground">
                  {permission.organizer.cardSystems?.[0]?.name}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={requestAccessHref}>
            <FontAwesomeIcon icon={faUserPlus} className="mr-2 size-4" />
            Toegang aanvragen
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { CounterSelectionButton };
