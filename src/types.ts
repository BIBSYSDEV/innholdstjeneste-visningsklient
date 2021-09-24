export interface Innholdsformasjon {
  isbn: string;
  title?: string;
  description_short?: string[];
  description_long?: string[];
  table_of_contents?: string[];
  image_path?: string;
  audio_file?: string;
  source?: string;
}

export interface ContentsResponse {
  source: string;
  audio_file: string;
  table_of_contents: string;
  description_long: string;
  description_short: string;
  title: string;
  image_large: string;
  image_original: string;
  image_small: string;
}
