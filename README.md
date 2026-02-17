# Table of Contents
- [UiTPAS Balie](#uitpas-balie)
   - [Local Development - Getting Started](#local-development---getting-started)
     - [Step 1: Specify Node.js Version](#step-1-specify-nodejs-version)
     - [Step 2: Setting Up Environment Variables](#step-1-setting-up-environment-variables)
     - [Step 3: Install Dependencies](#step-2-install-dependencies)
     - [Step 4: Start the Application](#step-3-start-the-application)
     - [Step 5: Login](#step-4-login)
   - [Guidebook](#guidebook)
      - [Main Framework & Libraries](#main-framework--libraries)
      - [Main Concept](#main-concept)
      - [Internationalization (I18n)](#internationalization-i18n)
      - [Environment Variables](#environment-variables)
      - [Test Local Development on Mobile Device](#Test-Local-Development-on-Mobile-Device)

# UiTPAS Balie

## Local Development - Getting Started

### Step 1: Specify Node.js Version

Before you begin, make sure you have Node.js version 18.16.1 installed (other versions might work, but was not tested). 
You can use `nvm` (Node Version Manager) to easily switch to this version if you have it installed. If not, you can install it with the following command:

```shell
nvm install 18.16.1
```

### Step 2: Setting Up Environment Variables

To get started with local development, you need to set up your environment variables.

1. Copy the `.env.example` file and rename it to `.env.local` using the following command:

   ```shell
   cp .env.example .env.local
   ```

2. By default, this frontend application uses the Test environment endpoints. To switch to the Acceptance environment, simply open the `.env.local` file and replace all instances of `test` with `acc`.


### Step 3: Install Dependencies

Install project dependencies using Yarn:

```shell
yarn install
```

### Step 4: Start the Application

You can now start the Next.js application with the following command:

```shell
yarn dev
```

### Step 5: Login

Once the application is running, open your web browser and navigate to [http://localhost:3000/app](http://localhost:3000/app) to access the login page.

After logging in, you will be redirected to the deployed frontend (e.g., [https://balie-test.uitpas.be/app](https://balie-test.uitpas.be/app)). Please note that browsers don't include cookies between different hosts by default, so you'll need to make a manual change to the cookies in your browser's DevTools:

1. Open your browser's DevTools (Pressing ⌥⌘ + i on a Mac).
2. Go to the "Application" tab.
3. Under the "Cookies" section in the left sidebar, select the domain.
4. Edit the "PHPSESSID" cookie: Check "Secure," and set "SameSite" to "None"
5. Return to [http://localhost:3000/app](http://localhost:3000/app), and you should now be logged in.

This workaround is temporary and required only as long as the legacy token endpoint is still being used, which is necessary for the AngularJS application.

## Guidebook

### Main Framework & Libraries

This project is based on Next.js v14, utilizing the app router. It also employs the following libraries:

- Joy UI (MUI) for UI components.
- Orval to generate React Query + Axios hooks for data fetching.
- FontAwesome (v6) icons.

### Main Concept

The mobile app is also served by the same Next.js application, allowing code to be shared between web and mobile environments. 
Detection and switching between the web and mobile app versions are based on browser size, using the `useDetectMobile.ts` React hook.

### Internationalization (I18n)

For text translation, `next-i18next` is used. You can find the translations in the `src/shared/lib/i18n/locales/nl/common.json` file.

⚠️ Remember to restart the server whenever you make changes to the JSON file.

### Environment Variables

All variables specified in the `.env(.local)` file should also be passed to `publicRuntimeConfig` in `src/shared/feature-config/getConfig.ts`, but only if they need to be available client-side.
Use the `useConfig` hook to get the environment variables.

### Test Local Development on Mobile Device

1. **Install LocalXpose**: Sign up for an account and log in using the CLI. For setup instructions, refer to the [LocalXpose documentation](https://localxpose.io/docs).
2. **Expose Local Server**: Run `yarn expose` to make your local dev server accessible externally. This will generate a public URL (e.g., `usaun45jvk.eu.loclx.io`).
3. **Access on Mobile**: Open the generated URL in your mobile browser to test your local development on a mobile device.

Because you can't change the cookie settings on a mobile device, you need to start your dev server with a bearer token:
After logging in on the test environment (on desktop), copy the bearer token from one of the API calls and add it to the `NEXT_PUBLIC_DEV_AUTH_TOKEN` environment variable. Then, restart the dev server.