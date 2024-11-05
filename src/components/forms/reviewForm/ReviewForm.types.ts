export interface Review {
    id: number;
    rating: number;
    author: string;
    date: string;
    description: string[];
}

export interface ReviewsData {
    title: string;
    items: Review[];
}
