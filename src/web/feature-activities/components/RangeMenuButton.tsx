import { mdiMenuDown } from '@mdi/js';
import Icon from '@mdi/react';
import { MouseEvent, RefObject } from 'react';

import { useTranslation } from '@/shared/lib/i18n/client';
import { TriggerButton } from '@/web/feature-activities/components/DateMenu.styles';
import { rangeMenuItem } from '@/web/feature-activities/components/RangeMenu';
import { Stack, Typography } from '@/web/lib/ui';

type RangeMenuButtonProps = {
  currentItem: rangeMenuItem;
  isOpen: boolean;
  onButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
  disabled: boolean;
};

export const RangeMenuButton = ({
  currentItem,
  isOpen,
  onButtonClick,
  buttonRef,
  disabled,
}: RangeMenuButtonProps) => {
  const { t } = useTranslation();

  return (
    <Stack sx={{ minWidth: '130px' }}>
      <Typography level="body2">
        <strong> {t('activities.dateRange')}</strong>
      </Typography>
      <Stack direction="row">
        <TriggerButton
          type="button"
          active={false}
          onClick={onButtonClick}
          ref={buttonRef}
          disabled={disabled}
        >
          {typeof currentItem.display === 'string' && t(currentItem.display)}
        </TriggerButton>
        <TriggerButton
          type="button"
          active={isOpen}
          onClick={() => buttonRef.current?.click()}
          sx={{ px: 0 }}
          disabled={disabled}
        >
          <Icon path={mdiMenuDown} size={1} />
        </TriggerButton>
      </Stack>
    </Stack>
  );
};
