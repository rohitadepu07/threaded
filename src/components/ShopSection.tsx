import { useEffect, useState } from "react";
import { ShopifyProduct, storefrontApiRequest, PRODUCTS_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ShopSection = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);
  const isCartLoading = useCartStore((s) => s.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 20 });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: ShopifyProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.node.title });
  };

  return (
    <section id="shop" className="py-20 px-6 bg-background fabric-texture">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-body">
            Our Store
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Shop Our Collection
          </h2>
          <div className="gold-divider w-48 mx-auto" />
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our handcrafted embroidery hoops and jewellery — each piece lovingly made with traditional artistry.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto" />
            <p className="font-body text-xl text-muted-foreground">No products found</p>
            <p className="font-body text-muted-foreground">Products are coming soon — check back later!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-0">
            {products.map((product) => {
              const image = product.node.images.edges[0]?.node;
              const price = product.node.priceRange.minVariantPrice;
              return (
                <div
                  key={product.node.id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/product/${product.node.handle}`)}
                >
                  <div className="ornate-border p-2 rounded-sm overflow-hidden mb-4">
                    {image ? (
                      <img
                        src={image.url}
                        alt={image.altText || product.node.title}
                        className="w-full h-64 object-cover rounded-sm group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-64 bg-muted flex items-center justify-center rounded-sm">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                    {product.node.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm mt-1 line-clamp-2">
                    {product.node.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-display text-lg font-bold text-foreground">
                      {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={isCartLoading}
                      className="font-body"
                    >
                      {isCartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopSection;
