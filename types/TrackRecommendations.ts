export type Track = {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: any; // This was empty in the provided sample. Adjust as needed.
    restrictions: Restrictions;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
};

type Album = {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: Restrictions;
    type: string;
    uri: string;
    copyrights: Copyright[];
    external_ids: ExternalIds;
    genres: string[];
    label: string;
    popularity: number;
    album_group: string;
    artists: SimpleArtist[];
};

type Artist = {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
};

type SimpleArtist = {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
};

type ExternalUrls = {
    spotify: string;
};

type Image = {
    url: string;
    height: number;
    width: number;
};

type Restrictions = {
    reason: string;
};

type Copyright = {
    text: string;
    type: string;
};

type ExternalIds = {
    isrc: string;
    ean?: string;
    upc?: string;
};

type Followers = {
    href: string;
    total: number;
};
