export interface Album {
  cover: string;
  cover_big: string;
  cover_medium: string;
  cover_small: string;
  cover_xl: string;
  id: number;
  md5_image: number;
  title: string;
  tracklist: string;
  type: "album";
}

export interface Artist {
  id: number;
  link: string;
  name: string;
  picture: string;
  picture_big: string;
  picture_medium: string;
  picture_small: string;
  picture_xl: string;
  tracklist: string;
  type: "artist";
}

export interface Track {
  album: Album;
  artist: Artist;
  duration: number;
  id: number;
  md5_image: number;
  link: string;
  preview: string;
  rank: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  type: "track";
}
