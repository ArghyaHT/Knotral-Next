import SiteMapPage from "@/Pages/SiteMap/SiteMapPage";
import { client } from "@/utils/sanityClient";

export default async function Page() {
  // Fetch all product slugs server-side
  const productSlugs = await client.fetch(
    `*[_type == "product" && defined(slug.current)]{
      "slug": slug.current,
      productName
    }`
  );

  return <SiteMapPage productSlugs={productSlugs} />;
}
