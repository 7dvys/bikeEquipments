import { getPermalink, } from './utils/permalinks';

export const headerData = {
  links: [
    // {
    //   text: 'Home',
    //   href:'#'
    // },
  ],
  actions: [
    { text: 'Contactanos', href: getPermalink('/contact') },
  ],
};

export const footerData = {
  links: [
    {title:'eMail',links:[
      { text: 'evarela@bikeequipments.com', href: getPermalink('/contact') },
      { text: 'asome@bikeequipments.com', href: getPermalink('/contact') },
    ]},
    {title:'WhatsApp',links:[
      { text: '+5491133-223344', href: getPermalink('/contact') },
    ]}
  ],
  secondaryLinks: [],
  socialLinks: [
    // { ariaLabel: 'WhatsApp', icon: 'tabler:brand-whatsapp', href: '#' },
    // { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    // { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    // { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    // { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],
  footNote: '',
};
