'use client';

import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trans } from 'react-i18next';

import { useCounter } from '@/hooks/useCounter';
import { useGetCounters } from '@/hooks/useGetCounters';
import { Organizer } from '@/shared/lib/dataAccess';
import { useTranslation } from '@/shared/lib/i18n/client';
import { useUserInfo } from '@/shared/lib/user';
import { getAssetUrl } from '@/shared/lib/utils';
import { storeCounter } from '@/store/counterStore';
import {
  Card,
  CardContent,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/ui';

import { CounterSelector } from './components/CounterSelector';

export const SelectCounterPage = () => {
  const { t } = useTranslation();
  const userInfo = useUserInfo();
  const [searchString, setSearchString] = useState('');
  const { lastCounterUsed, setActiveCounter, setLastCounterUsed } =
    useCounter();
  const { allData, data, isLoading } = useGetCounters(
    lastCounterUsed,
    searchString,
  );
  const router = useRouter();

  const totalCounters = Array.isArray(allData?.data) ? allData.data.length : 0;
  const showSearch = totalCounters > 1;

  const handleSelect = (organizer: Organizer) => {
    setLastCounterUsed(organizer);
    storeCounter(organizer);
    setActiveCounter(organizer);
    router.push('/');
  };

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 px-4 pt-12">
      <Card className="h-fit w-full max-w-lg">
        <CardContent className="flex flex-col gap-4 p-8">
          <div className="flex justify-center">
            <Image
              src={getAssetUrl('/images/svg/logo-uitpas-green.svg')}
              alt="UiTPAS Logo"
              width={200}
              height={48}
              priority
            />
          </div>

          <h1 className="text-center text-2xl mb-4">
            <Trans
              i18nKey="counter.welcome"
              values={{ name: userInfo?.given_name ?? '' }}
              components={{ bold: <strong className="text-primary" /> }}
            />
          </h1>

          <h2 className="text-xl font-bold">{t('counter.selectCounter')}</h2>

          {showSearch && (
            <InputGroup className="mb-3">
              <InputGroupAddon align="inline-start">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </InputGroupAddon>
              <InputGroupInput
                placeholder={t('counter.searchCounter')}
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
              {searchString && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton onClick={() => setSearchString('')}>
                    <FontAwesomeIcon icon={faXmark} />
                  </InputGroupButton>
                </InputGroupAddon>
              )}
            </InputGroup>
          )}

          <CounterSelector
            className="max-h-[calc(100vh-420px)]"
            data={data}
            filterString={searchString}
            isLoading={isLoading}
            lastCounterUsed={lastCounterUsed}
            onSelect={handleSelect}
          />
        </CardContent>
      </Card>
    </div>
  );
};
