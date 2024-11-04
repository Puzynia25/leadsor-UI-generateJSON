export interface Offer {
    id: number;
    title: string;
    money: string;
    img: string;
    term: string;
    link: string;
    tagId: number[];
    isBestOffer: boolean;
}

export interface OffersData {
    data: Offer[];
}
