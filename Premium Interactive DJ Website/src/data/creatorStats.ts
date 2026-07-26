export type MetricCard = {
  label: string;
  value: string;
  detail: string;
};

export type AudienceBar = {
  label: string;
  value: string;
  percent: number;
};

export type CreatorVideo = {
  title: string;
  category: string;
  description: string;
  source: string;
  poster: string;
  hasAudio: boolean;
};

export type AnalyticsScreenshot = {
  title: string;
  metric: string;
  src: string;
};

export const creatorStats = {
  updatedAt: "July 2026",
  period: "Last 30 days",
  dateRange: "June 5 - July 4, 2026",
  followersExact: "12,033",
  followers: "12K+",
  monthlyViewsExact: "174,189",
  monthlyViews: "174K+",
  accountsReachedExact: "56,062",
  accountsReached: "56K+",
  interactionsExact: "24,039",
  interactions: "24K+",
  netGrowth: "+1,779",
  newFollowersExact: "1,967",
  newFollowers: "1.9K",
  unfollows: "188",
  profileVisits: "7,848",
  profileActivity: "8,369",
  linkClicks: "521",
  maleAudience: "65.9%",
  femaleAudience: "34.1%",
  mainAge: "25-44",
  followerGrowthPercent: "+17.3%",
};

export const creatorSnapshot: MetricCard[] = [
  { label: "Followers", value: creatorStats.followers, detail: creatorStats.followersExact },
  { label: "Monthly views", value: creatorStats.monthlyViews, detail: creatorStats.monthlyViewsExact },
  { label: "Accounts reached", value: creatorStats.accountsReached, detail: creatorStats.accountsReachedExact },
  { label: "Interactions", value: creatorStats.interactions, detail: creatorStats.interactionsExact },
  { label: "Net growth", value: creatorStats.netGrowth, detail: `${creatorStats.newFollowersExact} new follows` },
  { label: "Male audience", value: creatorStats.maleAudience, detail: "Followers audience" },
  { label: "Main age", value: creatorStats.mainAge, detail: "75.1% of followers" },
  { label: "Core markets", value: "BR + IT", detail: "Brazil, Italy, US, Spain" },
];

export const analyticsSnapshot: MetricCard[] = [
  { label: "Followers", value: creatorStats.followersExact, detail: `${creatorStats.followerGrowthPercent} vs Jun 4` },
  { label: "Monthly views", value: creatorStats.monthlyViewsExact, detail: creatorStats.dateRange },
  { label: "Accounts reached", value: creatorStats.accountsReachedExact, detail: "+263.2%" },
  { label: "Interactions", value: creatorStats.interactionsExact, detail: "Official Instagram Insights" },
  { label: "New followers", value: creatorStats.newFollowersExact, detail: `${creatorStats.netGrowth} net growth` },
  { label: "Link clicks", value: creatorStats.linkClicks, detail: `${creatorStats.profileVisits} profile visits` },
];

export const followerAge: AudienceBar[] = [
  { label: "25-34", value: "43.6%", percent: 43.6 },
  { label: "35-44", value: "31.5%", percent: 31.5 },
  { label: "45-54", value: "13.7%", percent: 13.7 },
  { label: "18-24", value: "6.0%", percent: 6.0 },
  { label: "55-64", value: "4.0%", percent: 4.0 },
];

export const followerGender: AudienceBar[] = [
  { label: "Men", value: "65.9%", percent: 65.9 },
  { label: "Women", value: "34.1%", percent: 34.1 },
];

export const topCountries: AudienceBar[] = [
  { label: "Brazil", value: "31.0%", percent: 31.0 },
  { label: "Italy", value: "13.3%", percent: 13.3 },
  { label: "United States", value: "6.7%", percent: 6.7 },
  { label: "Spain", value: "5.4%", percent: 5.4 },
];

export const topCities: AudienceBar[] = [
  { label: "Sao Paulo", value: "4.8%", percent: 4.8 },
  { label: "Milan", value: "2.1%", percent: 2.1 },
  { label: "Rome", value: "1.4%", percent: 1.4 },
  { label: "Rio de Janeiro", value: "1.2%", percent: 1.2 },
];

export const contentPillars = [
  "European Lifestyle",
  "Fitness",
  "Menswear",
  "Travel",
  "Nightlife",
  "DJ & Music",
  "Brazil in Europe",
  "Italy vs Brazil",
];

export const collaborationFormats = [
  "Reels and short-form campaigns",
  "Hotel, tourism and city lifestyle content",
  "Menswear and grooming product showcases",
  "Fitness, wellness and transformation stories",
  "Nightlife and event coverage",
  "Brand activations with DJ and creator presence",
  "Instagram Stories with link and call to action",
  "UGC-style product videos for paid media",
];

export const creatorVideos: CreatorVideo[] = [
  {
    title: "UGC Creator Introduction",
    category: "UGC + On-camera",
    description: "A concise introduction to my approach to attention-led, authentic brand content.",
    source: "/creator/videos/ugc-creator-introduction.mp4",
    poster: "/creator/posters/ugc-creator-introduction.jpg",
    hasAudio: true,
  },
  {
    title: "Hair Wax UGC Campaign",
    category: "Men's Grooming",
    description: "A complete UGC product story created for Bottega Paesano, from problem to result.",
    source: "/creator/videos/ugc-hair-wax-bottega-paesano.mp4",
    poster: "/creator/posters/ugc-hair-wax-bottega-paesano.jpg",
    hasAudio: true,
  },
  {
    title: "Product Showcase",
    category: "Brand / Product",
    description: "Ideal for gifting, product reveal, menswear and retail campaigns.",
    source: "/creator/videos/brand-product-showcase.mp4",
    poster: "/creator/posters/brand-product-showcase.jpg",
    hasAudio: true,
  },
  {
    title: "Fitness Public Speaking",
    category: "Fitness + Communication",
    description: "Ideal for fitness, wellness, coaching and motivational campaigns.",
    source: "/creator/videos/fitness-public-speaking.mp4",
    poster: "/creator/posters/fitness-public-speaking.jpg",
    hasAudio: true,
  },
  {
    title: "Winter Lifestyle Milan",
    category: "Menswear + Milan",
    description: "Ideal for menswear, grooming, styling and premium lifestyle campaigns.",
    source: "/creator/videos/winter-lifestyle-milan.mp4",
    poster: "/creator/posters/winter-lifestyle-milan.jpg",
    hasAudio: true,
  },
];

export const analyticsScreenshots: AnalyticsScreenshot[] = [
  {
    title: "Views Overview",
    metric: "174,189 views and 56,062 accounts reached",
    src: "/analytics/2026-07/instagram-insights-views-overview.png",
  },
  {
    title: "Views Audience Cities",
    metric: "Sao Paulo, Milan, Rome and Rio de Janeiro",
    src: "/analytics/2026-07/instagram-insights-views-audience-cities.png",
  },
  {
    title: "Interactions Overview",
    metric: "24,039 interactions",
    src: "/analytics/2026-07/instagram-insights-interactions-overview.png",
  },
  {
    title: "Interactions Cities",
    metric: "Location split from Instagram Insights",
    src: "/analytics/2026-07/instagram-insights-interactions-cities.png",
  },
  {
    title: "Interactions Countries",
    metric: "Brazil, Italy, United States and Spain",
    src: "/analytics/2026-07/instagram-insights-interactions-countries.png",
  },
  {
    title: "Interactions Age",
    metric: "Main age groups 25-44",
    src: "/analytics/2026-07/instagram-insights-interactions-age.jpg",
  },
  {
    title: "Interactions Audience Crop",
    metric: "iPad crop with audience cards",
    src: "/analytics/2026-07/instagram-insights-interactions-age-crop.png",
  },
  {
    title: "Interactions Reels Breakdown",
    metric: "8,251 likes, 994 saves, 739 shares",
    src: "/analytics/2026-07/instagram-insights-interactions-reels-breakdown.png",
  },
  {
    title: "Views Countries",
    metric: "Brazil 31.0%, Italy 13.3%",
    src: "/analytics/2026-07/instagram-insights-views-countries.png",
  },
  {
    title: "Views Age",
    metric: "25-34 and 35-44 lead the audience",
    src: "/analytics/2026-07/instagram-insights-views-age.png",
  },
  {
    title: "Views Content and Profile Activity",
    metric: "7,848 visits and 521 external link taps",
    src: "/analytics/2026-07/instagram-insights-views-content-profile-activity.png",
  },
  {
    title: "Followers Growth",
    metric: "12,033 followers and +17.3%",
    src: "/analytics/2026-07/instagram-insights-followers-growth.png",
  },
  {
    title: "Followers Age",
    metric: "25-34: 43.6%, 35-44: 31.5%",
    src: "/analytics/2026-07/instagram-insights-followers-audience-age.png",
  },
  {
    title: "Followers Gender and Activity",
    metric: "65.9% men, 34.1% women",
    src: "/analytics/2026-07/instagram-insights-followers-gender-activity.png",
  },
];

export const creatorLinks = {
  email:
    "mailto:dj@toszan.com.br?subject=Brand%20Partnership%20Inquiry%20-%20Willian%20Toszan&body=Brand%20%2F%20Agency%3A%0AContact%20name%3A%0ACampaign%20goal%3A%0ARequested%20deliverables%3A%0ATimeline%3A%0ABudget%20range%3A%0AAdditional%20details%3A%0A",
  whatsapp:
    "https://wa.me/393428369444?text=Hi%20Willian%2C%20I%27d%20like%20to%20discuss%20a%20creator%20collaboration.%0ABrand%20%2F%20Agency%3A%0ACampaign%20goal%3A%0ATimeline%3A%0A",
  instagram: "https://www.instagram.com/toszan.willian/",
  mediaKit: "/#mediakit",
  analytics: "/analytics",
};
