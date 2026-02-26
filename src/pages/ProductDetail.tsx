import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopifyProduct, storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const isCartLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.productByHandle) {
          setProduct(data.data.productByHandle);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [handle]);

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.variants.edges[selectedVariantIdx]?.node;
    if (!variant) return;
    const shopifyProduct: ShopifyProduct = {
      node: product,
    };
    await addItem({
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.title });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="font-display text-2xl text-foreground">Product not found</p>
        <Button variant="outline" onClick={() => navigate("/")} className="font-body">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Button>
      </div>
    );
  }

  const images = product.images.edges;
  const selectedVariant = product.variants.edges[selectedVariantIdx]?.node;
  const price = selectedVariant?.price || product.priceRange.minVariantPrice;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-8 font-body text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
        </Button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="ornate-border p-3 rounded-sm overflow-hidden">
              {images[selectedImageIdx] ? (
                <img
                  src={images[selectedImageIdx].node.url}
                  alt={images[selectedImageIdx].node.altText || product.title}
                  className="w-full h-[500px] object-cover rounded-sm"
                />
              ) : (
                <div className="w-full h-[500px] bg-muted flex items-center justify-center rounded-sm">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-20 h-20 rounded-sm overflow-hidden border-2 flex-shrink-0 transition-colors ${
                      idx === selectedImageIdx ? "border-accent" : "border-border"
                    }`}
                  >
                    <img src={img.node.url} alt={img.node.altText || ""} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">{product.title}</h1>
              <div className="gold-divider w-24 mt-4" />
            </div>

            <p className="font-display text-2xl font-bold text-foreground">
              {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
            </p>

            <p className="font-body text-lg leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Variant selector */}
            {product.variants.edges.length > 1 && (
              <div className="space-y-3">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => {
                        const variantIdx = product.variants.edges.findIndex((v) =>
                          v.node.selectedOptions.some((o) => o.name === option.name && o.value === value)
                        );
                        const isSelected = selectedVariant?.selectedOptions.some(
                          (o) => o.name === option.name && o.value === value
                        );
                        return (
                          <Button
                            key={value}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            onClick={() => variantIdx >= 0 && setSelectedVariantIdx(variantIdx)}
                            className="font-body"
                          >
                            {value}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button
              size="lg"
              className="w-full font-body text-lg"
              onClick={handleAddToCart}
              disabled={isCartLoading || !selectedVariant?.availableForSale}
            >
              {isCartLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : !selectedVariant?.availableForSale ? (
                "Sold Out"
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
