export interface Innholdsformasjon {
  isbn: string;
  title?: string;
  descriptionShort?: string[];
  descriptionLong?: string[];
  tableOfContents?: string[];
  imagePath?: string;
  audioFile?: string;
  source?: string;
}

export interface ContentsResponse {
  source: string;
  audioFile: string;
  tableOfContents: string;
  descriptionLong: string;
  descriptionShort: string;
  title: string;
  imageLarge: string;
  imageOriginal: string;
  imageSmall: string;
}
