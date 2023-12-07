const numberFormat = new Intl.NumberFormat("ko-KR");

export function formatNumber(num: number) {
  return numberFormat.format(num);
}
