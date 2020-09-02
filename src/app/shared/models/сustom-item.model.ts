export interface ICustomItem {
    id: string;
    snippet: ICustomSnippet;
}

export interface ICustomSnippet {
    publishedAt: string;
    title: string;
    description: string;
    thumbnail: string;
    link: string;
}
