import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const orderSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Enter a valid phone number").max(15),
  product: z.string().min(1, "Please select a product type"),
  customization: z.string().trim().min(1, "Please describe your requirements").max(1000),
});

type OrderFormData = z.infer<typeof orderSchema>;

const OrderEnquirySection = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      product: "",
      customization: "",
    },
  });

  const onSubmit = (data: OrderFormData) => {
    const message = `Hi! I'd like to place an order.\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nProduct: ${data.product}\nDetails: ${data.customization}`;
    const whatsappUrl = `https://wa.me/+918779404726?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      form.reset();
    }, 3000);
  };

  return (
    <section className="py-24 px-6 bg-card fabric-texture">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-body">
            Place Your Order
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Custom Order Enquiry
          </h2>
          <div className="gold-divider w-32 mx-auto mb-6" />
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Tell us about your dream piece and we'll bring it to life with love and thread.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-16 animate-fade-in-up">
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="font-display text-2xl text-foreground mb-2">
              Enquiry Sent!
            </h3>
            <p className="font-body text-muted-foreground">
              We'll get back to you within 24 hours. Thank you! 🌺
            </p>
          </div>
        ) : (
          <div className="ornate-border p-8 md:p-10 rounded-sm bg-background">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6 relative z-0">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-foreground">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="border-border bg-background font-body"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-foreground">Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+91 XXXXX XXXXX"
                            className="border-border bg-background font-body"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-foreground">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your@email.com"
                          className="border-border bg-background font-body"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-foreground">Product Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-border bg-background font-body">
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="wedding-hoop">Wedding & Couple Hoop</SelectItem>
                          <SelectItem value="friendship-hoop">Friendship & Memory Hoop</SelectItem>
                          <SelectItem value="floral-art">Floral & Traditional Art</SelectItem>
                          <SelectItem value="jewellery">Handmade Jewellery</SelectItem>
                          <SelectItem value="custom">Custom Design</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-foreground">
                        Customization Details
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your requirements — names, colours, motifs, occasion, size, etc."
                          className="border-border bg-background font-body min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display text-lg py-6"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Enquiry via WhatsApp
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderEnquirySection;
