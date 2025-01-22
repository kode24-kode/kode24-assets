export interface Listing {
  id: string;
  published_url: string;
  title: string;
  applicationTitle?: string;
  published: string;
  section: string;
  image: string;
  tags?: string;
  type?: string;
  premium?: boolean;
  location?: [string];
  company: Company;
}

export interface Company {
  imageUrl: string;
  name: string;
  logoReal?: string;
  logoRealDark?: string;
  logoWithoutSize?: string;
  logoBackgroundLight?: string;
  logoBackgroundDark?: string;
  description: string;
}

export interface partnerAd {
  title: string;
  url: string;
  banner: string;
  uniqueValue: string | undefined;
}
export interface partnerAds {
  slug: string;
  company: {
    logo: string;
    title: string;
  };
  ads: Array<partnerAd>;
}
export interface Content {
  id: string;
  published_url: string;
  title: string;
  published: string;
  section: string;
  image: string;
  premium: boolean;
  location: [string];
  company: {
    imageUrl: string;
    name: string;
    description: string;
  };
}

export interface Article {
  id: string;
  title: string;
  published: string;
  section: string;
  image: string;
  published_url: string;
  tags: string;
  subtitle: string;
  frontCropUrl: string;
  highestRatedComment?: Comment;
  byline: {
    name: string;
    bio: string;
    imageUrl: string;
  };
  reactions: {
    reactions: Array<number>;
    comments_count: number;
    reactions_count: number;
  };
}
export interface DesktopRow {
  title: string;
  description: string;
  tags: string;
  style: string;
  layout: string;
  antall: number;
  lenke: string;
  articles: Array<Article>;
}

export interface Event {
  startDate: string;
  startDateFormatted: string;
  timeFormatted: string;
  arrangedBy: string;
  name: string;
  description: string;
  link: string;
  photo: string;
  digital: boolean;
  location: string;
  isPremium: boolean;
}

export interface Patreon {
  name: string;
  title: string;
  link: string;
  logo: string;
}

export interface Comment {
  url?: string;
  page_identifier?: string;
  created_at?: string;
  upvotes?: number;
  downvotes?: number;
  rating?: number;
  user: {
    id?: number;
    type?: string;
    name: string;
    email?: string;
    picture: string;
  };
  bodySnippet: string;
  articleTitle?: string;
}

export interface CompanyPartner {
  slug: string;
  darkLogo: string;
  lightLogo: string;
  tooltip: string;
  title: string;
  banner: string;
  company: {
    title: string;
    logo: string;
  };
}

export interface ContentTile {
  title: string;
  applicationTitle?: string;
  hideFrom: string;
  adlink: string;
  banner: string;
  company: {
    name: string;
    logo: string;
    logoReal?: string;
    logoRealDark?: string;
    logoBackgroundLight?: string;
    logoBackgroundDark?: string;
  };
}

export interface Frontpage {
  latestArticles: [Article];
  frontpage: [DesktopRow];
  listing: {
    listings: [Listing];
    premiumIds: [string];
  };
  jobs: [Listing];
  content: [Content];
  events: {
    upcomingEvents: [Event];
    previousEvents: [Event];
    premiumEvents: [Event];
  };
  partners: {
    goldPatreon: [Patreon];
    silverPatreon: [Patreon];
  };
  newestComments: [Comment];
  companyPartners: [CompanyPartner];
  contentTiles: [ContentTile];
  jobAdsSanity: [ContentTile];
  partnerAdsSanity: [partnerAds];
  easterHighscore?: {
    users: [HighScoreUser];
    teams: [HighscoreTeam];
  };
}

export interface HighScoreUser {
  id: number;
  username: string;
  totalscore: string;
}

export interface HighscoreTeam {
  id: number;
  name: string;
  totalscore: string;
}

export interface Quicksearch {
  from: string;
  to: string;
  applicant: string;
  jobUrl: string;
  jobTitle: string;
}
