import { productResultDummy } from '../dummy';
import { CartProduct } from '../models';

export const CalcSalePercentage = (salePrice: string | number, retailPrice: string | number) =>
  Math.floor((1 - Number(salePrice) / Number(retailPrice)) * 100);

export const CalcTotalPriceOrder = (listOrder: CartProduct[]) => {
  const result: Number = listOrder.reduce(
    (total, item) =>
      total + Number(item.order.quantity) * Number(productResultDummy[item.id].salePrice),
    0
  );
  return result;
};
