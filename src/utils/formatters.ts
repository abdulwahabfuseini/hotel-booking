export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getRoomTheme = (type: 'SUITE' | 'DELUXE' | 'PENTHOUSE') => {
  const themes = {
    PENTHOUSE: 'bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500',
    SUITE: 'bg-stone-900',
    DELUXE: 'bg-stone-800',
  };
  return themes[type];
};