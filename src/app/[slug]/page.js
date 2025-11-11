// app/[slug]/page.js
import SingleProductPage from "@/Pages/Single-Product-Page/SingleProductPage";
import { client } from "@/utils/sanityClient";

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

  if (!product) return <p>Product not found.</p>;

  return <SingleProductPage slug={slug}/>;
}
