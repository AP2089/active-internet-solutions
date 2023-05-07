export interface IOrderType {
  name: string;
  tooltip: string;
}

export interface IOrder {
  id: number;
  price: string;
  type: IOrderType | null;
  name: string;
  frame: string;
  apartment: string;
  year: string;
  status: string;
  address: string;
  date: string;
  info: {
    apartment_number: string;
    square: string;
    number_rooms: string;
    floor: string;
  };
  image: {
    webp: string;
    any: string;
  }
}

export interface IOrderSelectItems {
  id: number | string;
  checked: boolean;
}