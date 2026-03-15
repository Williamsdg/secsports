export interface NormalizedVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: number;
  date: string;
  teamIds: number[];
  type: "highlight" | "interview" | "analysis" | "feature";
}
