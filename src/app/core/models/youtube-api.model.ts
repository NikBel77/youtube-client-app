export interface IApiSettings {
    apiKey: string;
    rootUrl: string;
    additionalPathForSearch: string;
    additionalPathForVideos: string;
}

export const apiSettings: IApiSettings = {
    apiKey: 'AIzaSyCeQUgJ_q3-nIOah7mWxf7LteODbSTllgc',
    rootUrl: 'https://www.googleapis.com',
    additionalPathForSearch: '/youtube/v3/search?',
    additionalPathForVideos: '/youtube/v3/videos?',
};
