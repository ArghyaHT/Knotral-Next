import AllProductsPage from "@/Pages/AllProducts/AllProductsPage";
import { client } from "@/utils/sanityClient";

// ✅ Server-side SEO metadata
export async function generateMetadata() {
  const products = await client.fetch(`
    *[_type == "product"]{
      productName,
      metaTitle,
      metaDescription
    }
  `);

  const metaTitle =
    products.map((p) => p.metaTitle || p.productName).join(" | ") ||
    "Knotral — Global Education Solutions";

  const metaDescription =
    products.map((p) => p.metaDescription).filter(Boolean).join(" ") ||
    "Explore world-class educational and technology solutions with Knotral.";

  return {
    title: "All Products — Knotral",
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: "https://knotral.com/all-products",
      siteName: "Knotral",
      type: "website",
    },
    alternates: {
      canonical: "https://knotral.com/all-products",
    },
  };
}

// ✅ Single default export (fetch + render)
export default async function Page() {
  const products = await client.fetch(`
    *[_type == "product"]{
      _id,
      productName,
      "slug": slug.current,
      "productLogo": productLogo.asset->url,
      "featuredImage": featuredImage.asset->url,
      "galleryImages": galleryImages[].asset->url,
      heading,
      slug,
      shortDescription,
      longDescription,
      companyType,
      tags,
      companyName,
      hqLocation,
      founded,
      age,
      grade,
      features,
      perfectFor,
      awards,
      language,
      training,
      support,
      price,
      currency, 
      productFor,    
      aboutHeading,
      subscriptionType,
      trialType,
      aboutDescription,
      reviews[]{
        reviewerName,
        reviewText,
        "reviewProfileImage": reviewProfileImage.asset->url
      },
      metaTitle,
      metaDescription,
      schemaMarkup
    }
  `);

  return <AllProductsPage products={products} />;
}
