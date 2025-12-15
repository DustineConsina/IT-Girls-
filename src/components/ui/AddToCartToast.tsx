import { FC } from "react";
import { Sparkles } from "lucide-react";

type ToastProduct = {
  name: string;
  price: number;
};

interface AddToCartToastProps {
  product: ToastProduct;
  onDismiss: () => void;
}

const AddToCartToast: FC<AddToCartToastProps> = ({ product, onDismiss }) => {
  return (
    <div className="pointer-events-auto cart-banner flex max-w-sm items-start gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-left text-sm text-white shadow-2xl backdrop-blur">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/80 text-white">
        <Sparkles size={16} />
      </div>
      <div className="flex-1 space-y-0.5">
        <p className="text-xs uppercase tracking-wide text-indigo-100/80">Added to bag</p>
        <p className="text-sm font-semibold text-white line-clamp-1">{product.name}</p>
        <p className="text-xs text-indigo-100/70">${product.price.toLocaleString()}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="rounded-full bg-white/10 px-2 text-indigo-100 transition hover:bg-white/20"
        aria-label="Dismiss add to cart notification"
      >
        &times;
      </button>
    </div>
  );
};

export default AddToCartToast;
