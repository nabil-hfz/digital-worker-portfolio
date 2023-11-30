
export class PortfolioEntryModel {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public imageUrl: string,
        public customerLink: string,
        public isVisible: boolean,
        public createdDate: Date,
    ) { }
}

export interface FilterPortfolioEntryModel {
    name: string;
    limit: number;
}
