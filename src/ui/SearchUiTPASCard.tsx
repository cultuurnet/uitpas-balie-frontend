'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';
import { Trans } from 'react-i18next';

import { useTranslation } from '@/shared/lib/i18n/client';
import { Button } from '@/ui/Button';
import { Card, CardContent } from '@/ui/Card';
import { Input } from '@/ui/Input';
import { Link } from '@/ui/Link';
import { Badge } from '@/ui/shadcn/badge';
import { Separator } from '@/ui/shadcn/separator';

type Props = {
  onSubmit: (value: string) => void;
  searchPassholderHref: string;
};

const SearchUiTPASCard = ({ onSubmit, searchPassholderHref }: Props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim()) onSubmit(value.trim());
  };

  return (
    <Card className="w-full max-w-lg">
      <CardContent className="flex flex-col gap-4 p-4">
        <p className="italic text-muted-foreground">{t('home.subtitle')}</p>

        <h1 className="text-2xl">
          <Trans
            i18nKey="home.heading"
            components={{
              bold: <strong />,
              italic: (
                <em className="font-normal not-italic text-muted-foreground" />
              ),
            }}
          />
        </h1>

        <div className="flex gap-2">
          <Input
            className="flex-1"
            placeholder={t('home.inputPlaceholder')}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <Button onClick={handleSubmit}>{t('home.confirmBtn')}</Button>
        </div>

        <div className="flex gap-2">
          <Badge
            variant="outline"
            className="gap-1 border-primary text-primary"
          >
            <Check className="size-3" />
            {t('home.eIdReaderFound')}
          </Badge>
          <Badge
            variant="outline"
            className="gap-1 border-primary text-primary"
          >
            <Check className="size-3" />
            {t('home.nfcReaderFound')}
          </Badge>
        </div>

        <Separator />

        <p>
          <strong>{t('home.noCard')}</strong>{' '}
          <Link href={searchPassholderHref}>{t('home.searchPassholder')}</Link>
        </p>

        <Separator />

        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold italic">
            {t('home.registerNewTitle')}
          </h2>
          <p className="italic text-muted-foreground">
            {t('home.registerNewSubtitle')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export { SearchUiTPASCard };
