export interface Data {
    id: number;
    title: string;
    money: string;
    img: string;
    term: string;
    link: string;
    tagId: number[];
    isBestOffer?: boolean;
}

export interface Tag {
    id: number;
    name: string;
}

interface RangeMoneySettings {
    title: string;
    currency: string;
}

export interface Settings {
    rangeMoney: RangeMoneySettings;
    linkText: string;
    cookieExpiresDays: number;
    title: string;
    subtitle: string;
    logo: string;
}

export interface OffersData {
    data: Data[];
    tags: Tag[];
    settings: Settings;
}
