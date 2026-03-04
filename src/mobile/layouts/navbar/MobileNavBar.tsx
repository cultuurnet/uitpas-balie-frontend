'use client';

import { ExitToApp, Settings } from '@mui/icons-material';
import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import uitpasLogo from 'public/images/svg/logo-uitpas.svg';
import { PropsWithChildren } from 'react';

import { useCounter } from '@/mobile/feature-counter/context/useCounter';
import { useLogout } from '@/shared/lib/auth';
import { useTranslation } from '@/shared/lib/utils/hooks/useTranslation';

import { NavBarIcon } from './components/NavBarIcon';
import { NavBarItemContainer } from './components/NavBarItemContainer';
import { NavBarTypography } from './components/NavBarTypography';

export const MobileNavBar = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const { clearCounter, activeCounter } = useCounter();
  const logout = useLogout();

  return (
    <>
      <Box
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'space-between',
          height: '46px',
          width: '100%',
          backgroundColor: theme.palette.navigation.primary,
          alignItems: 'center',
          boxShadow: '0px 6px 9px rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        })}
      >
        <Image
          src={uitpasLogo}
          alt="uitpas logo"
          width={102}
          height={25}
          style={{
            marginLeft: '12px',
            cursor: 'pointer',
          }}
          priority={true}
          onClick={clearCounter}
        />
        {activeCounter ? (
          <NavBarItemContainer
            component={Link}
            href="/mobile/counters"
            onClick={clearCounter}
          >
            <NavBarTypography>{activeCounter.name}</NavBarTypography>
            <NavBarIcon icon={Settings} />
          </NavBarItemContainer>
        ) : (
          <NavBarItemContainer
            onClick={() => logout()}
            sx={{ columnGap: '4px', mr: '10px', cursor: 'pointer' }}
          >
            <NavBarTypography>{t('counter.mobile.logoutBtn')}</NavBarTypography>
            <NavBarIcon icon={ExitToApp} />
          </NavBarItemContainer>
        )}
      </Box>
      {children}
    </>
  );
};
