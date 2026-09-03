export interface PartnerPage2 {
  title: string;
  slug: string;
  publishedAt?: string;

  partnerSite?: string;
  heroImage?: string;
  heroIngress: PortableTextBlock[];

  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
    x?: string;
  };

  company: {
    title: string;
    logo?: string;
  } | null;

  modules: PartnerPage2Module[];
}

export type PartnerPage2Module =
  | PartnerTextMediaRow
  | PartnerArticleList
  | PartnerExternalJobAdList
  | PartnerYoutubeList;

export interface PartnerTextMediaRow {
  _key: string;
  _type: "partnerTextMediaRow";

  title?: string;

  mediaType?: "image" | "youtube" | "vimeo";

  image?: string;

  youtubeUrl?: string;
  vimeoUrl?: string;

  text?: PortableTextBlock[];

  cta?: {
    enabled?: boolean;
    title?: string;
    link?: string;
  };
}

export interface PartnerArticleList {
  _key: string;
  _type: "partnerArticleList";

  title?: string;
  ingress?: PortableTextBlock[];

  items?: PartnerArticleCard[];
}

export interface PartnerArticleCard {
  _key?: string;
  _type?: "partnerArticleCard";

  image?: string;
  title?: string;
  link?: string;
}

export interface PartnerExternalJobAdList {
  _key: string;
  _type: "partnerExternalJobAdList";

  title?: string;

  items?: PartnerExternalJobAdCard[];
}

export interface PartnerExternalJobAdCard {
  _key?: string;
  _type?: "partnerExternalJobAdCard";

  title?: string;
  salesTitle?: string;
  link?: string;

  jobLocationCity?: Array<Record<string, unknown>>;
  jobType?: Array<Record<string, unknown>>;

  publishedAt?: string;
  unpublishedAt?: string;
  dueDate?: string;
}

export interface PartnerYoutubeList {
  _key: string;
  _type: "partnerYoutubeList";

  title?: string;
  ingress?: PortableTextBlock[];

  items?: PartnerYoutubeCard[];
}

export interface PartnerYoutubeCard {
  _key?: string;
  _type?: "partnerYoutubeCard";

  title?: string;
  url?: string;
}

export interface PortableTextBlock {
  _key?: string;
  _type: string;

  style?: string;
  markDefs?: Array<Record<string, unknown>>;

  children?: Array<{
    _key?: string;
    _type?: string;
    text?: string;
    marks?: string[];
  }>;
}
