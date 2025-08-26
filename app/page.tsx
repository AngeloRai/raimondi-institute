'use client'

import ImageCarousel from "@/ui/modules/ImageCarousel";
import ContactForm from "@/ui/modules/ContactForm";

export default function Home() {


  return (
    <div className="w-full min-h-screen">
      <ImageCarousel />
      <ContactForm 
        id="contact"
        heading="Get in Touch"
        subheading="Ready to find your perfect piano? We'd love to hear from you."
        subjects={["General Inquiry", "Piano Lessons", "Piano Purchase", "Technical Support"]}
        addresses={["123 Music Street, Piano City, PC 12345"]}
        phones={["+1 (555) 123-4567"]}
        schedule="Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed"
        backgroundColor="light"
        formspreeId="xandypqa"
      />
    </div>
  );
}
