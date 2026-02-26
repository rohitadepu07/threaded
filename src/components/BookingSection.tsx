import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const BookingSection = () => {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    if (!date || !selectedTime || !name.trim() || !phone.trim()) return;

    const message = `Hi! I'd like to book a consultation.\n\nName: ${name}\nPhone: ${phone}\nDate: ${format(date, "PPP")}\nTime: ${selectedTime}`;
    const whatsappUrl = `https://wa.me/+918779404726?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      setDate(undefined);
      setSelectedTime("");
      setName("");
      setPhone("");
    }, 3000);
  };

  const isFormValid = date && selectedTime && name.trim() && phone.trim();

  return (
    <section className="py-24 px-6 bg-background fabric-texture">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-body">
            Book a Consultation
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Schedule Your Session
          </h2>
          <div className="gold-divider w-32 mx-auto mb-6" />
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Pick a date and time to discuss your custom order with our artist.
          </p>
        </div>

        {booked ? (
          <div className="text-center py-16 animate-fade-in-up">
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="font-display text-2xl text-foreground mb-2">
              Booking Confirmed!
            </h3>
            <p className="font-body text-muted-foreground">
              We'll reach out to confirm your consultation. See you soon! ✨
            </p>
          </div>
        ) : (
          <div className="ornate-border p-8 md:p-10 rounded-sm bg-card">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Left: Date & Contact */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="font-body text-sm text-foreground font-medium">Your Name</label>
                  <Input
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-border bg-background font-body"
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-sm text-foreground font-medium">Phone Number</label>
                  <Input
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-border bg-background font-body"
                    maxLength={15}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-sm text-foreground font-medium">
                    Select Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-body border-border",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => d < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Right: Time Slots */}
              <div className="space-y-4">
                <label className="font-body text-sm text-foreground font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "py-3 px-4 rounded-sm border font-body text-sm transition-all duration-200",
                        selectedTime === time
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-foreground hover:border-accent hover:text-accent"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <Button
                  onClick={handleBook}
                  disabled={!isFormValid}
                  className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-display text-lg py-6"
                >
                  Book Consultation via WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingSection;
