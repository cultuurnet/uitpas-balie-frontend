import { useTranslation } from '@/shared/lib/utils';

type Step = {
  key: string;
  subSteps: string[];
};

const TRANSLATIONSTEPS_PATH =
  'identification.mobile.scan.permissionDenied.steps';

const getStepTranslation = (
  variant: string,
  stepIndex: number,
  subStepIndex?: number,
) =>
  `${TRANSLATIONSTEPS_PATH}.${variant}.step${stepIndex}${
    subStepIndex !== undefined ? `.${subStepIndex}` : ''
  }`;

// This function maps the translations to a steps object
// adding a new step in the translation json will display new steps in the UI
export const useMapTranslationsToSteps = () => {
  const { t } = useTranslation();
  return (variant: string): Step[] => {
    const steps: Step[] = [];
    let stepIndex = 1;
    let stepKey = getStepTranslation(variant, stepIndex);

    //if requested variant doesn't exist in translationKeys, use chrome
    if (variant !== 'chrome' && t(stepKey, { defaultValue: '' }) === '') {
      variant = 'chrome';
      stepKey = getStepTranslation('chrome', stepIndex);
    }

    while (t(stepKey, { defaultValue: '' }) !== '') {
      const step: Step = {
        key: stepKey,
        subSteps: [],
      };

      let subStepIndex = 1;
      let subStepKey = getStepTranslation(variant, stepIndex, subStepIndex);

      while (t(subStepKey, { defaultValue: '' }) !== '') {
        step.subSteps.push(subStepKey);
        subStepIndex++;
        subStepKey = getStepTranslation(variant, stepIndex, subStepIndex);
      }

      steps.push(step);
      stepIndex++;
      stepKey = getStepTranslation(variant, stepIndex);
    }

    return steps;
  };
};
