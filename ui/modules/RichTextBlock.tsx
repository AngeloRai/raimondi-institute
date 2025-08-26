import { RichText } from "../components/RichText";
import type { RichTextBlockProps } from "@/lib/contentful/types/fields";

function RichTextBlock({ copy }: RichTextBlockProps) {
  if (!copy) return null;

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RichText content={copy} />
      </div>
    </section>
  );
}

export default RichTextBlock;