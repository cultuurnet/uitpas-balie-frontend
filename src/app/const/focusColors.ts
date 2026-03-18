export type FocusColor = 'primary' | 'secondary' | 'muted';

export const focusColorValues: Record<FocusColor, string> = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  muted: 'var(--color-muted-foreground)',
};
