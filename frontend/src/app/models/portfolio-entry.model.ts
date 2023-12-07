
export class PortfolioEntryModel {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public imageUrl: string,
        public customerLink: string,
        public isVisible: boolean,
        public createdDate: Date,
    ) { }
}

export interface FilterPortfolioEntryModel {
    page: number;
    limit: number;
}
