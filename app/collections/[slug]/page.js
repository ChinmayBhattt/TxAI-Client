import CollectionsClient from "../CollectionsClient";

export async function generateStaticParams() {
  return [
    { slug: "mountain-view-villas" },
    { slug: "water-view-villas" },
    { slug: "hidden-gems" },
    { slug: "senior-citizen-friendly" },
    { slug: "couples-friendly" },
    { slug: "kids-friendly" },
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${title} | EkoStay Collection`,
    description: `Explore handpicked ${title} across top destinations in India.`,
  };
}

export default function CollectionSlugPage() {
  return <CollectionsClient />;
}
