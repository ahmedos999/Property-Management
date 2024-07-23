import { Property } from "./property";

export interface Lead {
    _id:string;
    name: string;
    user:any;
    propertyCard: any[];
  }