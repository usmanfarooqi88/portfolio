export interface NavItem {
  label: string
  href: string
  /** true = section scroll target on homepage; false = page navigation */
  inPage: boolean
}

export const navItems: NavItem[] = [
  { label: 'Intro', href: '#intro', inPage: true },
  { label: 'Work', href: '/work', inPage: false },
  { label: 'Background', href: '#background', inPage: true },
  { label: 'About', href: '#about', inPage: true },
  { label: 'Contact', href: '#contact', inPage: true },
  { label: 'Experiments', href: '#experiments', inPage: true },
  { label: 'Résumé', href: 'https://drive.google.com/drive/folders/1_Bl7I_ouRA5up-S01Q786I0hzvFiW-2W?usp=sharing', inPage: false },
]
