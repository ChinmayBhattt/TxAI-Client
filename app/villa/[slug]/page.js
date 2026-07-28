import { notFound } from "next/navigation";
import { getVilla, getAllVillaSlugs } from "../../data/villas";
import VillaDetailClient from "./VillaDetailClient";

export async function generateStaticParams() {
  return getAllVillaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const villa = getVilla(slug);
  if (!villa) return { title: "Villa Not Found" };
  return {
    title: `Staycation Villas - ${villa.name} | Luxury Villa in ${villa.location}`,
    description: villa.description[0],
  };
}

export default async function VillaPage({ params }) {
  const { slug } = await params;
  const villa = getVilla(slug);
  if (!villa) notFound();

  return <VillaDetailClient villa={villa} />;
}
