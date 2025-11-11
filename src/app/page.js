import { client } from "@/utils/sanityClient";
import Home from "@/Pages/Home/Home";

// ✅ Server-side SEO metadata
export async function generateMetadata() {
  try {
    // Fetch some product data from Sanity (adjust query fields if needed)
    const products = await client.fetch(`
     *[_type == "product"]{
  productName,
  metaTitle,
  metaDescription
}
    `);

    // Combine product meta info for SEO
    const metaTitle =
      products.map(p => p.metaTitle || p.productName).join(" | ") ||
      "Knotral — Global Education Solutions";

    const metaDescription =
      products.map(p => p.metaDescription).filter(Boolean).join(" ") ||
      "Explore world-class educational and technology solutions with Knotral.";

    return {
      title: "Knotral",
      description: metaDescription,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        url: "https://knotral.com",
        siteName: "Knotral",
        type: "website",
      },
      alternates: {
        canonical: "https://knotral.com",
      },
    };
  } catch (error) {
    console.error("Metadata fetch failed:", error);
    return {
      title: "Knotral — Global Education Solutions",
      description: "Explore world-class educational and technology solutions.",
    };
  }
}

// ✅ Render Home client component
export default function Page() {
  return <Home />;
}
