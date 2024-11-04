export interface General {
    id: number;
    title: string;
    money: string;
    img: string;
    term: string;
    link: string;
    tagId: number[];
    isBestOffer: boolean;
}

export interface GeneralData {
    data: General[];
}
