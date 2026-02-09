export enum PaymentMethodEnum {
  Gcash = 'Gcash',
  Maya = 'Maya',
  BPI = 'BPI',
  UnionBank = 'UnionBank',
  BDO = 'BDO',
}

export const PaymentMethodImageMap: Record<PaymentMethodEnum, string> = {
  Gcash:
    'https://assets.bizclikmedia.net/1800/19730dba84dfc1b565e051e2e7940921:d432beca886c7e6227c1afe17b398532/gcash.png',
  Maya: 'https://coingeek.com/wp-content/uploads/2023/03/maya-logo.jpg',
  BPI: 'https://insiderph.com/uploads/articles/bpi-eyes-at-least-p5b-from-sale-of-sustainable-bonds-2-1280x720.webp',
  UnionBank:
    'https://insiderph.com/uploads/articles/aboitizs-unionbank-reaping-citi-benefits-q2-2024-profit-surges-50-3-1024x768.webp?v=1',
  BDO: 'https://www.adobomagazine.com/wp-content/uploads/2023/04/BDO-1Q-2023-earnings-at-16-5-billion-hero.jpg',
};

export const PaymentMethodNumberMap: Record<PaymentMethodEnum, number> = {
  Gcash: 0,
  Maya: 1,
  BPI: 2,
  UnionBank: 3,
  BDO: 4,
};
