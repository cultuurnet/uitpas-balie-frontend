import { BoldFormattedText } from '@/mobile/lib/ui/uitpas/BoldFormattedText';
import { useTranslation } from '@/shared/lib/utils/hooks';
import { useUserAgentInfo } from '@/shared/lib/utils/hooks/useUserAgentInfo';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useMapTranslationsToSteps } from './permissionDeniedInstructionsMapper';

export const PermissionDeniedInstructions = () => {
  const { t } = useTranslation();
  const mapTranslationsToSteps = useMapTranslationsToSteps();

  const userAgentInfo = useUserAgentInfo();

  const variant = useMemo(() => {
    if (!userAgentInfo.browser.name) return 'chrome';

    const browserName = userAgentInfo.browser.name.toLowerCase();
    const osName = userAgentInfo.os.name?.toLowerCase() || '';
    const isMobile = /iphone|ipad|android/.test(
      navigator.userAgent.toLowerCase(),
    );

    if (
      isMobile &&
      (osName.includes('ios') ||
        (browserName.includes('safari') && osName.includes('mac')))
    ) {
      return 'ios';
    }

    // Desktop variants
    if (browserName.includes('firefox')) return 'firefox';
    if (browserName.includes('safari')) return 'chrome'; // Safari desktop is similar to Chrome
    if (browserName.includes('edge')) return 'chrome'; // Edge is Chromium-based
    if (browserName.includes('opera')) return 'chrome'; // Opera is Chromium-based

    return 'chrome';
  }, [userAgentInfo]);

  const steps = mapTranslationsToSteps(variant);

  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <BoldFormattedText
          text={t('identification.mobile.scan.permissionDenied.description')}
        />
      </Typography>

      <List sx={{ p: 0, pl: 2 }}>
        {steps.map((step, index) => (
          <Box key={step.key}>
            <ListItem
              sx={{
                display: 'list-item',
                listStyleType: 'decimal',
                p: 0,
                pl: 1,
              }}
            >
              <ListItemText
                primary={<BoldFormattedText text={t(step.key)} />}
              />
            </ListItem>

            {step.subSteps.length > 0 && (
              <List sx={{ p: 0 }}>
                {step.subSteps.map((subStepKey, subIndex) => {
                  const subStepMatch = subStepKey.match(/step(\d+\.\d+)$/);
                  const subStepNumber = subStepMatch
                    ? subStepMatch[1]
                    : `${index + 1}.${subIndex + 1}`;

                  return (
                    <ListItem
                      key={subStepKey}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        p: 0,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          minWidth: '30px',
                          fontWeight: 500,
                          fontSize: '0.875rem',
                        }}
                      >
                        {subStepNumber}
                      </Box>
                      <ListItemText
                        primary={<BoldFormattedText text={t(subStepKey)} />}
                        sx={{ m: 0 }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );
};
