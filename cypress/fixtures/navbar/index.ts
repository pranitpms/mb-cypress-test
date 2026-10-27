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