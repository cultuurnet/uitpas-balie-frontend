'use client';

import { ChevronsUpDown, Search, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { useIsMobile } from '@/hooks/shadcn/use-mobile';
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
  requestAccessHref: string;
  totalCounters: number;
  onSelect: (organizer: Organizer) => void;
};

const CounterSelectionButton = ({
  activeCounter,
  counters,
  requestAccessHref,
  totalCounters,
  onSelect,
}: Props) => {
  const [search, setSearch] = useState('');
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const showSearch = totalCounters > SEARCH_THRESHOLD;

  const filteredCounters = search
    ? counters.filter(
        ({ organizer }) =>
          organizer.name?.toLowerCase().includes(search.toLowerCase()) ||
          organizer.cardSystems?.some((cs) =>
            cs.name?.toLowerCase().includes(search.toLowerCase()),
          ),
      )
    : counters;

  const hasResults = filteredCounters.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="mt-2 h-auto items-center justify-between gap-2 rounded-lg border border-neutral-400 bg-neutral-300 px-3.5 py-3 transition-all duration-150 hover:border-neutral-450 hover:bg-neutral-200 hover:text-inherit">
          <div className="flex flex-col items-start">
            <span className="font-semibold">{activeCounter?.name}</span>
            <span className="text-xs text-muted-foreground">
              {activeCounter?.cardSystems?.[0]?.name}
            </span>
          </div>
          <ChevronsUpDown className="shrink-0" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width)"
        side={isMobile ? 'bottom' : 'right'}
        align="start"
        avoidCollisions={false}
      >
        {showSearch && (
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-8"
                placeholder={t('counter.searchCounter')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
        {hasResults && (
          <>
            <DropdownMenuLabel>{t('counter.selectCounter')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <div className="max-h-[calc(10*2.5rem)] overflow-y-auto [direction:rtl]">
          <div className="[direction:ltr]">
            {!hasResults && (
              <p className="px-3 py-2 text-sm italic text-muted-foreground">
                {t('counter.noCounterSearch', { searchTerm: search })}
              </p>
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
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={requestAccessHref}>
            <UserPlus className="mr-2 size-4" />
            {t('counter.requestCounterAccess')}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { CounterSelectionButton };
