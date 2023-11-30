// src/app/models/portfolio-entry.model.ts

export class PortfolioEntryModel {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public imageUrl: string,
        public customerLink: string,
        public isVisible: boolean
    ) { }
}

export interface FilterPortfolioEntryModel {
    name: string;
    limit: number;
}
