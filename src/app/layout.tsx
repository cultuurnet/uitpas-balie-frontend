import { ReactNode } from "react";
import { Metadata, Viewport } from "next";
import { Providers } from "@/app/Providers";
import { palette } from "@/mobile/lib/ui";
import { ConfigProvider } from "@/shared/feature-config/context/ConfigProvider";
import { AnalyticsProvider } from "@/shared/feature-google-analytics/AnalyticsProvider";
import { InstallPrompt } from "@/shared/feature-install-prompt/InstallPrompt";

const APP_NAME = "UiTPAS Beheer";
const APP_DEFAULT_TITLE = "UiTPAS Beheer";
const APP_TITLE_TEMPLATE = "%s | UiTPAS Beheer";
const APP_DESCRIPTION = "UiTPAS Beheer";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  // manifest: `${process.env.BASE_PATH}/manifest.json`,
};

export const viewport: Viewport = {
  themeColor: palette.primary,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="nl">
      <head />
      <body style={{ overflowX: "hidden" }}>
        <ConfigProvider>
          <AnalyticsProvider>
            <Providers>
              {children}
              {/* TODO */}
              {/*<InstallPrompt />*/}
            </Providers>
          </AnalyticsProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
