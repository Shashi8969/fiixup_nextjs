export function offerSchema({
  minPrice,
  maxPrice,
}: {
  minPrice: number;
  maxPrice: number;
}) {
  return {
    "@type": "Offer",

    priceCurrency: "INR",

    availability: "https://schema.org/InStock",

    priceSpecification: {
      "@type": "PriceSpecification",

      minPrice,

      maxPrice,

      priceCurrency: "INR",
    },
  };
}