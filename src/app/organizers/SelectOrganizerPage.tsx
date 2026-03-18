'use client';

import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trans } from 'react-i18next';

import { useGetOrganizers } from '@/hooks/useGetOrganizers';
import { useOrganizer } from '@/hooks/useOrganizer';
import { Organizer } from '@/shared/lib/dataAccess';
import { useTranslation } from '@/shared/lib/i18n/client';
import { useUserInfo } from '@/shared/lib/user';
import { getAssetUrl } from '@/shared/lib/utils';
import { storeOrganizer } from '@/store/organizerStore';
import {
  Card,
  CardContent,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/ui';

import { OrganizerSelector } from './components/OrganizerSelector';

export const SelectOrganizerPage = () => {
  const { t } = useTranslation();
  const userInfo = useUserInfo();
  const [searchString, setSearchString] = useState('');
  const { lastOrganizerUsed, setActiveOrganizer, setLastOrganizerUsed } =
    useOrganizer();
  const { allData, data, isLoading } = useGetOrganizers(
    lastOrganizerUsed,
    searchString,
  );
  const router = useRouter();

  const totalOrganizers = Array.isArray(allData?.data)
    ? allData.data.length
    : 0;
  const showSearch = totalOrganizers > 1;

  const handleSelect = (organizer: Organizer) => {
    setLastOrganizerUsed(organizer);
    storeOrganizer(organizer);
    setActiveOrganizer(organizer);
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
              i18nKey="organizer.welcome"
              values={{ name: userInfo?.given_name ?? '' }}
              components={{ bold: <strong className="text-primary" /> }}
            />
          </h1>

          <h2 className="text-xl font-bold">
            {t('organizer.selectOrganizer')}
          </h2>

          {showSearch && (
            <InputGroup className="mb-3">
              <InputGroupAddon align="inline-start">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </InputGroupAddon>
              <InputGroupInput
                placeholder={t('organizer.searchOrganizer')}
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

          <OrganizerSelector
            className="max-h-[calc(100vh-420px)]"
            data={data}
            filterString={searchString}
            isLoading={isLoading}
            lastOrganizerUsed={lastOrganizerUsed}
            onSelect={handleSelect}
          />
        </CardContent>
      </Card>
    </div>
  );
};
