export interface DataForPoints {
  id: string;
  coordinates: number[];
}

export interface MapComponentProps {
  onChangeCoordinates?: (coords: number[]) => void;
  initialCoordinates?: number[];
  dataForPoints?: DataForPoints[];
  selectedAd?: (id: string) => void;
}
