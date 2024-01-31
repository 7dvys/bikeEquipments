import { getPermalink, } from './utils/permalinks';

export const headerData = {
  links: [
    // {
    //   text: 'Home',
    //   href:'#'
    // },
  ],
  actions: [
    { text: 'Contact Us', href: getPermalink('/contact') },
  ],
};

export const footerData = {
  links: [],
  secondaryLinks: [
    { text: 'Contact Us', href: getPermalink('/contact') },
  ],
  socialLinks: [
    // { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    // { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    // { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    // { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    // { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],
  footNote: '',
};
