import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Calendar, MapPin, Music, Clock, Wrench, Truck, Wallet, MessageSquare } from "lucide-react";
import { z } from "zod";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookingForm = () => {
  const { t } = useLanguage();

  const bookingSchema = z.object({
    eventName: z
      .string()
      .trim()
      .min(1, t.booking.validation.eventNameRequired)
      .max(200, t.booking.validation.eventNameMax),
    eventDate: z
      .string()
      .trim()
      .min(1, t.booking.validation.eventDateRequired),
    venue: z
      .string()
      .trim()
      .min(1, t.booking.validation.venueRequired)
      .max(200, t.booking.validation.venueMax),
    performanceType: z
      .string()
      .min(1, t.booking.validation.performanceTypeRequired),
    duration: z
      .string()
      .trim()
      .min(1, t.booking.validation.durationRequired)
      .max(100, t.booking.validation.durationMax),
    technicalInfo: z
      .string()
      .trim()
      .max(1000, t.booking.validation.technicalInfoMax)
      .optional(),
    logisticsInfo: z
      .string()
      .trim()
      .max(1000, t.booking.validation.logisticsInfoMax)
      .optional(),
    budget: z
      .string()
      .trim()
      .max(200, t.booking.validation.budgetMax)
      .optional(),
    message: z
      .string()
      .trim()
      .max(2000, t.booking.validation.messageMax)
      .optional(),
  });

  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    venue: "",
    performanceType: "",
    duration: "",
    technicalInfo: "",
    logisticsInfo: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, performanceType: value }));
    if (errors.performanceType) {
      setErrors((prev) => ({ ...prev, performanceType: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = bookingSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0].toString()] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-booking-email", {
        body: {
          eventName: result.data.eventName,
          eventDate: result.data.eventDate,
          venue: result.data.venue,
          performanceType: result.data.performanceType,
          duration: result.data.duration,
          technicalInfo: result.data.technicalInfo || "",
          logisticsInfo: result.data.logisticsInfo || "",
          budget: result.data.budget || "",
          message: result.data.message || "",
        },
      });

      if (error) {
        console.error("Error sending booking request:", error);
        toast({
          title: t.booking.toast.errorTitle,
          description: t.booking.toast.errorDescription,
          variant: "destructive",
        });
      } else {
        toast({
          title: t.booking.toast.title,
          description: t.booking.toast.description,
        });
        setFormData({
          eventName: "",
          eventDate: "",
          venue: "",
          performanceType: "",
          duration: "",
          technicalInfo: "",
          logisticsInfo: "",
          budget: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error sending booking request:", error);
      toast({
        title: t.booking.toast.errorTitle,
        description: t.booking.toast.errorDescription,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const performanceTypes = [
    { value: "dj-set", label: t.booking.form.performanceTypes.djSet },
    { value: "live", label: t.booking.form.performanceTypes.live },
    { value: "workshop", label: t.booking.form.performanceTypes.workshop },
  ];

  return (
    <div className="max-w-2xl mx-auto bg-card/60 backdrop-blur-md rounded-2xl p-8 border border-border/50 animate-fade-up-delay-1">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Name */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Music className="w-4 h-4 text-primary" />
            <label className="text-sm font-medium text-foreground">{t.booking.form.eventName}</label>
          </div>
          <Input
            name="eventName"
            placeholder={t.booking.form.eventNamePlaceholder}
            value={formData.eventName}
            onChange={handleChange}
            className="bg-muted/50 border-border/50 focus:border-primary"
          />
          {errors.eventName && (
            <p className="text-destructive text-sm mt-1">{errors.eventName}</p>
          )}
        </div>

        {/* Event Date & Venue Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <label className="text-sm font-medium text-foreground">{t.booking.form.eventDate}</label>
            </div>
            <Input
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={handleChange}
              className="bg-muted/50 border-border/50 focus:border-primary"
            />
            {errors.eventDate && (
              <p className="text-destructive text-sm mt-1">{errors.eventDate}</p>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary" />
              <label className="text-sm font-medium text-foreground">{t.booking.form.venue}</label>
            </div>
            <Input
              name="venue"
              placeholder={t.booking.form.venuePlaceholder}
              value={formData.venue}
              onChange={handleChange}
              className="bg-muted/50 border-border/50 focus:border-primary"
            />
            {errors.venue && (
              <p className="text-destructive text-sm mt-1">{errors.venue}</p>
            )}
          </div>
        </div>

        {/* Performance Type & Duration Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Music className="w-4 h-4 text-primary" />
              <label className="text-sm font-medium text-foreground">{t.booking.form.performanceType}</label>
            </div>
            <Select value={formData.performanceType} onValueChange={handleSelectChange}>
              <SelectTrigger className="bg-muted/50 border-border/50 focus:border-primary">
                <SelectValue placeholder={t.booking.form.performanceTypePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {performanceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.performanceType && (
              <p className="text-destructive text-sm mt-1">{errors.performanceType}</p>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <label className="text-sm font-medium text-foreground">{t.booking.form.duration}</label>
            </div>
            <Input
              name="duration"
              placeholder={t.booking.form.durationPlaceholder}
              value={formData.duration}
              onChange={handleChange}
              className="bg-muted/50 border-border/50 focus:border-primary"
            />
            {errors.duration && (
              <p className="text-destructive text-sm mt-1">{errors.duration}</p>
            )}
          </div>
        </div>

        {/* Technical Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="w-4 h-4 text-primary" />
            <label className="text-sm font-medium text-foreground">{t.booking.form.technicalInfo}</label>
          </div>
          <Textarea
            name="technicalInfo"
            placeholder={t.booking.form.technicalInfoPlaceholder}
            rows={3}
            value={formData.technicalInfo}
            onChange={handleChange}
            className="bg-muted/50 border-border/50 focus:border-primary resize-none"
          />
          {errors.technicalInfo && (
            <p className="text-destructive text-sm mt-1">{errors.technicalInfo}</p>
          )}
        </div>

        {/* Logistics Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-4 h-4 text-primary" />
            <label className="text-sm font-medium text-foreground">{t.booking.form.logisticsInfo}</label>
          </div>
          <Textarea
            name="logisticsInfo"
            placeholder={t.booking.form.logisticsInfoPlaceholder}
            rows={3}
            value={formData.logisticsInfo}
            onChange={handleChange}
            className="bg-muted/50 border-border/50 focus:border-primary resize-none"
          />
          {errors.logisticsInfo && (
            <p className="text-destructive text-sm mt-1">{errors.logisticsInfo}</p>
          )}
        </div>

        {/* Budget */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-primary" />
            <label className="text-sm font-medium text-foreground">{t.booking.form.budget}</label>
          </div>
          <Input
            name="budget"
            placeholder={t.booking.form.budgetPlaceholder}
            value={formData.budget}
            onChange={handleChange}
            className="bg-muted/50 border-border/50 focus:border-primary"
          />
          {errors.budget && (
            <p className="text-destructive text-sm mt-1">{errors.budget}</p>
          )}
        </div>

        {/* Free Message */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            <label className="text-sm font-medium text-foreground">{t.booking.form.message}</label>
          </div>
          <Textarea
            name="message"
            placeholder={t.booking.form.messagePlaceholder}
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="bg-muted/50 border-border/50 focus:border-primary resize-none"
          />
          {errors.message && (
            <p className="text-destructive text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            t.booking.form.sending
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {t.booking.form.submit}
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
