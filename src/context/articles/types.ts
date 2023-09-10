export interface Article {
    date: string;
    id: number;
    sport: {
      id: number;
      name: string;
    };
    summary: string;
    teams: {
      id: number;
      name: string
    }[];
    thumbnail: string;
    title: string;
  }