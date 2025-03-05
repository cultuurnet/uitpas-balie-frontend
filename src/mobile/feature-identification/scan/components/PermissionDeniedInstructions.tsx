import { useTranslation } from "@/shared/lib/utils/hooks";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { ReactNode, useMemo } from "react";
import uaParser from "ua-parser-js";

type Step = {
  key: string;
  subSteps: string[];
};

export const PermissionDeniedInstructions = () => {
  const { t } = useTranslation();

  const formatBoldText = (text: string): ReactNode[] => {
    if (!text.includes("**")) return [text];

    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        return <strong key={index}>{boldText}</strong>;
      }
      return part;
    });
  };

  const userAgentInfo = useMemo(() => {
    if (typeof window !== "undefined") {
      return uaParser(navigator.userAgent);
    }
    return { browser: { name: undefined }, os: { name: undefined } };
  }, []);

  const variant = useMemo(() => {
    if (!userAgentInfo.browser.name) return "chrome";

    const browserName = userAgentInfo.browser.name.toLowerCase();
    const osName = userAgentInfo.os.name?.toLowerCase() || "";
    const isMobile = /iphone|ipad|android/.test(
      navigator.userAgent.toLowerCase()
    );

    if (
      isMobile &&
      (osName.includes("ios") ||
        (browserName.includes("safari") && osName.includes("mac")))
    ) {
      return "ios";
    }

    // Desktop variants
    if (browserName.includes("firefox")) return "firefox";
    if (browserName.includes("safari")) return "chrome"; // Safari desktop is similar to Chrome
    if (browserName.includes("edge")) return "chrome"; // Edge is Chromium-based
    if (browserName.includes("opera")) return "chrome"; // Opera is Chromium-based

    return "chrome";
  }, [userAgentInfo]);

  const getSteps = (variant: string): Step[] => {
    const steps: Step[] = [];
    let stepIndex = 1;
    let stepKey = `identification.mobile.scan.permissionDenied.steps.${variant}.step${stepIndex}`;

    if (variant !== "chrome" && t(stepKey, { defaultValue: "" }) === "") {
      variant = "chrome";
      stepKey = `identification.mobile.scan.permissionDenied.steps.${variant}.step${stepIndex}`;
    }

    while (t(stepKey, { defaultValue: "" }) !== "") {
      const step: Step = {
        key: stepKey,
        subSteps: [],
      };

      let subStepIndex = 1;
      let subStepKey = `identification.mobile.scan.permissionDenied.steps.${variant}.step${stepIndex}.${subStepIndex}`;

      while (t(subStepKey, { defaultValue: "" }) !== "") {
        step.subSteps.push(subStepKey);
        subStepIndex++;
        subStepKey = `identification.mobile.scan.permissionDenied.steps.${variant}.step${stepIndex}.${subStepIndex}`;
      }

      steps.push(step);
      stepIndex++;
      stepKey = `identification.mobile.scan.permissionDenied.steps.${variant}.step${stepIndex}`;
    }

    return steps;
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600 }}>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {formatBoldText(
          t("identification.mobile.scan.permissionDenied.description")
        )}
      </Typography>

      <List sx={{ p: 0, pl: 2 }}>
        {getSteps(variant).map((step, index) => (
          <Box key={step.key}>
            <ListItem
              sx={{
                display: "list-item",
                listStyleType: "decimal",
                p: 0,
                pl: 1,
              }}
            >
              <ListItemText primary={formatBoldText(t(step.key))} />
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
                        display: "flex",
                        alignItems: "flex-start",
                        p: 0,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          minWidth: "30px",
                          fontWeight: 500,
                          fontSize: "0.875rem",
                        }}
                      >
                        {subStepNumber}
                      </Box>
                      <ListItemText
                        primary={formatBoldText(t(subStepKey))}
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
