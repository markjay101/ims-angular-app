export enum PaymentMethodImage {
  Gcash = 'https://assets.bizclikmedia.net/1800/19730dba84dfc1b565e051e2e7940921:d432beca886c7e6227c1afe17b398532/gcash.png',
  Maya = 'https://coingeek.com/wp-content/uploads/2023/03/maya-logo.jpg',
  BPI = 'https://insiderph.com/uploads/articles/bpi-eyes-at-least-p5b-from-sale-of-sustainable-bonds-2-1280x720.webp',
  UnionBank = 'https://insiderph.com/uploads/articles/aboitizs-unionbank-reaping-citi-benefits-q2-2024-profit-surges-50-3-1024x768.webp?v=1',
  BDO = 'https://www.adobomagazine.com/wp-content/uploads/2023/04/BDO-1Q-2023-earnings-at-16-5-billion-hero.jpg',
}

export enum PaymentMethodEnum {
  Gcash,
  Maya,
  BPI,
  UnionBank,
  BDO,
}

export enum PaymentMethodString {
  Gcash = 'Gcash',
  Maya = 'Maya',
  BPI = 'BPI',
  UnionBank = 'UnionBank',
  BDO = 'BDO',
}

export const PaymentMethodImageMap: Record<PaymentMethodEnum, string> = {
  0: PaymentMethodImage.Gcash,
  1: PaymentMethodImage.Maya,
  2: PaymentMethodImage.BPI,
  3: PaymentMethodImage.UnionBank,
  4: PaymentMethodImage.BDO,
};

export const PaymentMethodMapEnum: Record<string, PaymentMethodEnum> = {
  Gcash: PaymentMethodEnum.Gcash,
  Maya: PaymentMethodEnum.Maya,
  BPI: PaymentMethodEnum.BPI,
  UnionBank: PaymentMethodEnum.UnionBank,
  BDO: PaymentMethodEnum.BDO,
};
