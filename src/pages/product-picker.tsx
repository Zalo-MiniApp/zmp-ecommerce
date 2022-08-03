import { useEffect, useMemo, useRef, useState } from 'react';

import Box from 'zmp-framework/react/box';
import Button from 'zmp-framework/react/button';
import Sheet from 'zmp-framework/react/sheet';
import Text from 'zmp-framework/react/text';
import Title from 'zmp-framework/react/title';
import List from 'zmp-framework/react/list';
import Radio from 'zmp-framework/react/radio';
import ListInput from 'zmp-framework/react/list-input';

import { createPortal } from 'react-dom';
import { zmp } from 'zmp-framework/react/lite';
import { useStore } from 'zmp-framework/react';
import store from '../store';
import ImageRatio from '../components/img-ratio';
import { CartProduct, orderOfStore, Product, Store } from '../models';
import ButtonFixed from '../components/button-fixed';
import cx from '../utils/cx';
import { convertPrice, getImgUrl } from '../utils';

const Note = () => (
  <Box m="4" mb="6">
    <Title size="small" className="mb-4">
      Ghi chú
    </Title>
    <ListInput
      id="note"
      wrap={false}
      type="text"
      placeholder="Nhập ghi chú (VD. Ít đá, nhiều đường...)"
      clearButton
      name="note"
      inputStyle={{
        backgroundColor: 'white',
        width: '100%',
        minHeight: '0',
      }}
    />
  </Box>
);

const ProductPicker = ({ zmproute, zmprouter }) => {
  const [quantity, setQuantity] = useState(1);
  const [storeId, setStoreId] = useState<number>(-1);
  const cart: orderOfStore[] = useStore('cart');
  const btnRef = useRef<HTMLDivElement | null>(null);
  const [sheetOpened, setSheetOpened] = useState(false);
  const listStores: Store[] = useStore('store');
  console.log('cart: ', cart);
  const product: Product | undefined = useMemo(() => {
    if (zmproute.query) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { productId, storeId } = zmproute.query;
      console.log(storeId);
      const currentStore = listStores.find((oa) => oa.key === Number(storeId));
      const currentProduct = currentStore!.listProducts.find(
        (item) => item.id === Number(productId)
      );
      setStoreId(Number(storeId));
      return currentProduct;
    }
    return undefined;
  }, [listStores]);

  const cartStore: orderOfStore | undefined = useMemo(() => {
    if (cart && storeId > -1) {
      const storeInCart = cart.find((oa) => oa.storeId === storeId);
      if (storeInCart) {
        return { ...storeInCart };
      }
    }
    return undefined;
  }, [cart, storeId]);

  const cartProduct: CartProduct | undefined = useMemo(() => {
    if (product && cartStore) {
      const currentProductOrder = cartStore.listOrder.find((ord) => ord.id === product.id);

      if (currentProductOrder) {
        return { ...currentProductOrder };
      }
    }
    return undefined;
  }, [product, cartStore]);

  useEffect(() => {
    if (cartProduct && sheetOpened) {
      const { quantity, ...data } = cartProduct.order;
      setQuantity(quantity);

      zmp.form.fillFromData('#product-picker-form', {
        ...data,
      });
    }
  }, [cartProduct, sheetOpened]);

  const addToStore = () => {
    const data = zmp.form.convertToData('#product-picker-form') as { quantity: number };
    data.quantity = quantity;
    store.dispatch('setCart', {
      storeId,
      productOrder: {
        id: product!.id,
        order: data,
      } as CartProduct,
    });
  };

  const sheet = useRef<any>(null);

  return (
    product && (
      <Sheet
        onSheetOpen={() => {
          setSheetOpened(true);
        }}
        ref={sheet}
        backdrop
        closeButton
        className="overflow-auto h-auto"
        swipeToClose
        swipeToStep={!!(product.options?.length || 0 > 1)}
        title="Chọn chi tiết"
        // @ts-ignore
        style={{ paddingBottom: btnRef.current?.el.clientHeight }}
      >
        <div className="w-full flex flex-row items-center justify-between overflow-hidden h-24 m-4 ">
          <div className="flex flex-row items-center">
            <div className="w-24 flex-none">
              <ImageRatio src={getImgUrl(product.pathImg)} alt="image product" ratio={1} />
            </div>
            <div className=" p-3 pr-0">
              <div className="line-clamp-2 text-sm break-words">{product.nameProduct}</div>
              <span className=" pt-1 font-semibold text-sm text-primary">
                <span className=" font-normal text-xs text-primary">đ</span>
                {convertPrice(product.salePrice)}
              </span>
            </div>
          </div>
        </div>

        <hr />
        <List
          form
          id="product-picker-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className=" title-type-picker">Số lượng</div>
          <div className="">
            <Box m={4} flex justifyContent="center" alignItems="center">
              <Button
                typeName="tertiary"
                className="w-10 rounded-full"
                onClick={() => {
                  if (quantity > 1) setQuantity((q) => q - 1);
                }}
              >
                <div className="border-t border-[#667685] w-4" />
              </Button>
              <Text className="mx-4">{quantity}</Text>
              <Button
                typeName="tertiary"
                className="w-10  rounded-full"
                iconZMP="zi-plus"
                onClick={() => setQuantity((q) => q + 1)}
              />
            </Box>
          </div>

          {product.options?.map((option, index) => (
            <div key={option.name}>
              <div className={cx('title-type-picker')}>{option.title}</div>
              {option.option.map((type, indexType) => (
                <Box
                  m={4}
                  key={type.value}
                  className={cx(indexType === 0 && index === 1 && 'sheet-modal-swipe-step')}
                >
                  <Radio
                    name={option.name}
                    value={type.value}
                    label={type.label}
                    defaultChecked={type.checked}
                  />
                </Box>
              ))}
            </div>
          ))}
          <div className=" title-type-picker" />

          <Note />
        </List>

        {createPortal(
          <ButtonFixed
            ref={btnRef}
            listBtn={[
              {
                id: 1,
                content: 'Thanh toán',
                type: 'secondary',
                onClick: () => {
                  addToStore();
                  zmprouter.navigate(`/finish-order/?id=${cartStore?.orderId}`);
                },
              },
              {
                id: 2,
                content: 'Thêm vào giỏ',
                type: 'primary',
                onClick: () => {
                  addToStore();
                  sheet?.current?.zmpSheet().close();
                },
              },
            ]}
          >
            <Box m={0} flex justifyContent="space-between" pb={4}>
              <div className=" text-sm">Tổng tiền</div>
              <div className=" text-lg font-medium text-primary">
                {convertPrice(quantity * Number(product.salePrice))} VNĐ
              </div>
            </Box>
          </ButtonFixed>,
          document.querySelector('#zmp-root')!
        )}
      </Sheet>
    )
  );
};

export default ProductPicker;
