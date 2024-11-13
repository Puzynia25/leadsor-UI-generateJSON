interface Range {
    min: number;
    max: number;
    step: number;
    currency: string;
    firstValue: number;
    name: string;
}

interface Link {
    name: string;
    link: string;
}

interface AnswerBlock {
    id: number;
    title: string;
    description: string;
}

interface Rating {
    id: number;
    rating: number;
    title: string;
    description: string;
    link: string;
}

interface FooterText {
    title: string;
    description: string[];
}

interface TableDataRow {
    id: number;
    question: string;
    answer: string;
    comment: string;
}

interface FAQItem {
    id: number;
    title: string;
    description: string;
}

interface Common {
    primaryButtonText: string;
    rangeData: {
        summa: Range;
        period: Range;
    };
    steps: any[];
}

interface Main {
    title: string;
    description: string[];
    img: {
        url: string;
        alt: string;
    };
    rangeBlock: {
        title: string;
        description: string;
        value: string;
        period: string;
        return: string;
        date: string;
    };
    answerBlock: AnswerBlock[];
}

interface Why {
    title: string;
    description: string;
    card_list: { id: number; description: string }[];
    rating: Rating[];
}

interface Footer {
    logo: string;
    links: Link[];
    text: FooterText[];
    copyright: string[];
}

interface Banner {
    title: string;
    description: string[];
    img: string;
}

interface ForWhat {
    descriptionBlock: {
        title: string;
        card_list: {
            id: number;
            title: string;
        }[];
    };
    priceBlock: {
        title: string;
        buttons: { title: string; value: number }[];
    };
}

interface About {
    title: string;
    description: string[];
    tableData: {
        head: {
            id: number;
            question: string;
            comment: string;
        };
        body: TableDataRow[];
    };
}

interface Congratulation {
    title: string;
    description: string;
    clockTitle: string;
}

interface Analytics {
    googleAnalyticsScript: string;
    googleTagManagerScript: string;
    googleTagManagerNoScript: string;
}

export interface General {
    common: Common;
    header: {
        logo: string;
        links: Link[];
    };
    main: Main;
    why: Why;
    footer: Footer;
    banner: Banner;
    forWhat: ForWhat;
    about: About;
    faq: {
        title: string;
        data: FAQItem[];
    };
    congratulation: Congratulation;
    analytics: Analytics;
}
