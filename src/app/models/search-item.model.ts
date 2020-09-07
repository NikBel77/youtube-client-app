export interface IItem {
    kind: string;
    etag: string;
    id: string;
    snippet: ISnipet;
    statistics: IStatistics;
}

export interface IStatistics {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
}

export interface ISnipet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: IThumbnails;
    channelTitle: string;
    tags: Array<string>;
    categoryId: string;
    liveBroadcastContent: string;
    localized: ILocalized;
    defaultAudioLanguage: string;
    defaultLanguage?: string;
}

export interface IThumbnails {
    default: IThumbnail;
    medium: IThumbnail;
    high: IThumbnail;
    standard: IThumbnail;
    maxres: IThumbnail;
}

export interface ILocalized {
    title: string;
    description: string;
}

export interface IThumbnail {
    url: string;
    width: number;
    height: number;
}
