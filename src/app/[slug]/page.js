// app/[slug]/page.js
import SingleProductPage from "@/app/[slug]/SingleProductPage";
import { client } from "@/utils/sanityClient";
import { notFound } from "next/navigation"; // ✅ import this


// 🧠 1️⃣ Generate dynamic SEO metadata for each product
export async function generateMetadata({ params }) {
  // params may be a Promise, so unwrap it
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  

  try {
    // Fetch product-specific SEO fields
    const product = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]{
        productName,
        metaTitle,
        metaDescription,
        "featuredImage": featuredImage.asset->url,
        schemaMarkup
      }`,
      { slug }
    );

    if (!product) {
      return {
        title: "Product Not Found | Knotral",
        description: "Sorry, this product could not be found.",
      };
    }

    const title = product.metaTitle || `${product.productName} | Knotral`;
    const description =
      product.metaDescription ||
      `Learn more about ${product.productName} from Knotral.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://knotral.com/${slug}`,
        siteName: "Knotral",
        images: product.featuredImage
          ? [{ url: product.featuredImage, width: 1200, height: 630, alt: title }]
          : [],
        type: "article",
      },
      alternates: {
        canonical: `https://knotral.com/${slug}`,
      },
      // Optional: Add JSON-LD structured data if available
      ...(product.schemaMarkup && {
        other: {
          "script:ld+json": JSON.stringify(product.schemaMarkup),
        },
      }),
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Knotral",
      description: "Explore world-class educational and technology solutions.",
    };
  }
}


export default async function Page({ params }) {
  // params may be a Promise, so unwrap it
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  console.log("Server-side slug:", slug);

  const product = await client.fetch(
               `*[_type == "product" && slug.current == $slug][0]{
            _id,
            productName,
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
            trialType,
            subscriptionType,
            aboutHeading,
            aboutDescription,
            reviews[]{
              reviewerName,
              reviewText,
              "reviewProfileImage": reviewProfileImage.asset->url
            },
              productFaqs[]{
          question,
          answer,
        },
      metaTitle,
      metaDescription,
      schemaMarkup
          }`,
    { slug }
  );

  if (!product) return notFound();

  return <SingleProductPage product={product} slug={slug}/>;
}
