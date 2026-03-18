import {
  CalendarDays,
  ChartBar,
  Download,
  Gift,
  House,
  IdCard,
  LucideIcon,
  Newspaper,
  Tablet,
  Usb,
  Users,
} from 'lucide-react';

type NavItem = { translationKey: string; href: string; icon: LucideIcon };

const primaryNavItems: NavItem[] = [
  { translationKey: 'nav.home', href: '/', icon: House },
  { translationKey: 'nav.passholders', href: '/pashouders', icon: IdCard },
  { translationKey: 'nav.activities', href: '/activities', icon: CalendarDays },
  { translationKey: 'nav.advantages', href: '/voordelen', icon: Gift },
  { translationKey: 'nav.checkindevices', href: '/zuilen', icon: Tablet },
  {
    translationKey: 'nav.expenseReport',
    href: '/expense-report',
    icon: Download,
  },
  {
    translationKey: 'nav.counterMemberships',
    href: '/medewerkers',
    icon: Users,
  },
  {
    translationKey: 'nav.counterStatistics',
    href: '/statistieken',
    icon: ChartBar,
  },
];

const secondaryNavItems: NavItem[] = [
  { translationKey: 'nav.cardreaders', href: '/kaartlezers', icon: Usb },
  { translationKey: 'nav.news', href: '/nieuws', icon: Newspaper },
];

export type { NavItem };
export { primaryNavItems, secondaryNavItems };
