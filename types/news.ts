export interface NormalizedArticle {
  id: string;
  headline: string;
  description: string;
  published: string;
  imageUrl: string;
  linkUrl: string;
  byline: string;
  type: "article" | "media";
  teamIds: number[];
}
