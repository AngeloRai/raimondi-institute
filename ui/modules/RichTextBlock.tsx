import { RichText } from "../components/RichText";
import type { RichTextBlockProps } from "@/lib/contentful/types/fields";

function RichTextBlock({ copy, backgroundColor }: RichTextBlockProps) {
  if (!copy) return null;

  const brandColorClasses = {
    "dark-forest-green": "bg-dark-forest-green",
    "medium-forest-green": "bg-medium-forest-green",
    "light-forest-green": "bg-light-forest-green",
    "charcoal-gray": "bg-charcoal-gray",
    "warm-cream": "bg-warm-cream",
    "pure-white": "bg-pure-white",
  };

  const bgColorClass =
    backgroundColor &&
    brandColorClasses[backgroundColor as keyof typeof brandColorClasses]
      ? brandColorClasses[backgroundColor as keyof typeof brandColorClasses]
      : "bg-warm-cream";

  return (
    <section className={`w-full py-12 lg:py-16 ${bgColorClass}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RichText content={copy} />
      </div>
    </section>
  );
}

export default RichTextBlock;
