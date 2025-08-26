'use client'

import ImageCarousel from "@/ui/modules/ImageCarousel";
import ContactForm from "@/ui/modules/ContactForm";

export default function Home() {


  return (
    <div className="w-full min-h-screen">
      <ImageCarousel />
      <ContactForm 
        id="contact"
        title="Get in Touch"
        subtitle="Ready to find your perfect piano? We'd love to hear from you."
        backgroundColor="light"
      />
    </div>
  );
}
