export interface Forms {
    id: number;
    title: string;
    money: string;
    img: string;
    term: string;
    link: string;
    tagId: number[];
    isBestOffer: boolean;
}

export interface FormsData {
    data: Forms[];
}
