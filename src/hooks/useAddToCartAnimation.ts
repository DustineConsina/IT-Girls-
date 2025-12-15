import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "../data/products";

type BannerState = {
  id: number;
  name: string;
  price: number;
};

export const useAddToCartAnimation = () => {
  const [activeProductId, setActiveProductId] = useState<number | null>(null);
  const [bannerProduct, setBannerProduct] = useState<BannerState | null>(null);
  const buttonTimeoutRef = useRef<number | null>(null);
  const bannerTimeoutRef = useRef<number | null>(null);

  const triggerAddToCartAnimation = useCallback((product: Product) => {
    if (buttonTimeoutRef.current) {
      window.clearTimeout(buttonTimeoutRef.current);
    }

    if (bannerTimeoutRef.current) {
      window.clearTimeout(bannerTimeoutRef.current);
    }

    setActiveProductId(product.id);
    setBannerProduct({ id: product.id, name: product.name, price: product.price });

    buttonTimeoutRef.current = window.setTimeout(() => {
      setActiveProductId(null);
    }, 520);

    bannerTimeoutRef.current = window.setTimeout(() => {
      setBannerProduct(null);
    }, 2200);
  }, []);

  const dismissBanner = useCallback(() => {
    if (bannerTimeoutRef.current) {
      window.clearTimeout(bannerTimeoutRef.current);
    }
    setBannerProduct(null);
  }, []);

  useEffect(() => {
    return () => {
      if (buttonTimeoutRef.current) {
        window.clearTimeout(buttonTimeoutRef.current);
      }

      if (bannerTimeoutRef.current) {
        window.clearTimeout(bannerTimeoutRef.current);
      }
    };
  }, []);

  return {
    activeProductId,
    bannerProduct,
    triggerAddToCartAnimation,
    dismissBanner,
  };
};
