export enum NavMenu {
    Explore = 'Explore',
    Features = 'Features',
    OTCDesk = 'OTC Desk',
    Company = 'Company',
    Support = 'Support',
    Blog = 'Blog',
    MBG = '$MBG',
}

export const NavItems = [
    {label: 'Explore', path: '/explore', h1: /Markets at your fingertips/i},
    {label: 'Features', path: '/features', h1: /The power of crypto is yours/i},
    {label: 'OTC Desk', path: '/features/otc-desk', h1: /Large trades. Zero slippage. Full discretion./i},
    {label: 'Company', path: '/company', h1: /Why MultiBank Group\?/i},
    {label: 'Support', path: '/support', h1: /Got questions?/i},
    {label: 'Blog', path: '/blog', h1: /Blog and news/i},
];

export const InvalidRoutes = [
    {id: 'NEG-01', path: '/en/this-page-does-not-exist-123'},
    {id: 'NEG-01b', path: '/en/explore/nope/nope'},
    {id: 'NEG-02', path: '/xx/explore'},
    {id: 'NEG-03a', path: '/en/explore%00'},
    {id: 'NEG-03b', path: '/en/explore/../../etc'},
];

export const LINK_CRAWL_PAGES = ['', '/explore', '/features', '/company'];

export const LAYOUT_PAGES = ['', '/explore', '/company'];

export const FooterPolicyLinks = [
    'Acceptable Use Policy',
    'Privacy Policy',
    'Cookie Policy',
    'Terms & Conditions',
    'Client Agreement',
]
