export interface Response200<D> {
  status: string;
  message: string;
  data: D;
  actions?: any;
}
export interface Response200NoData {
  status: string;
  message: string;
}

export interface Response204 {
  status: string;
  message: string;
}

export interface Response500<D> {
  status: string;
  message: string;
  error: string;
  actions?: any;
}

export interface Response400<D> {
  status: string;
  message: string;
  error: string;
  actions?: any;
}

export interface Response401<D> {
  status: string;
  message: string;
  error: string;
  actions?: any;
}



