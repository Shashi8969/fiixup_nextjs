export interface FAQ {
  q: string;
  a: string;
}

export interface FAQCategory {
  category: string;
  faqs: FAQ[];
}

