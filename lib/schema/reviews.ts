export function reviewSchema(
  reviews: {
    name: string;
    rating: number;
    text: string;
    date?: string;
  }[]
) {
  return reviews.map((r) => ({
    "@type": "Review",

    author: {
      "@type": "Person",
      name: r.name,
    },

    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: "5",
    },

    reviewBody: r.text,

    datePublished: r.date,
  }));
}