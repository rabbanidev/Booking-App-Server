import { Model } from 'mongoose';

export type IService = {
  name: string;
  category: string;
  location: string;
  price: number;
  maxSize: number;
  description: string;
  image: string;
  isUpcoming?: boolean;
  // rooms:[]
  facilities?: string[];

  rating?: number;
  numOfReviews?: number;
};

export type ServiceModel = Model<IService, Record<string, string>>;

export type IServiceFilters = {
  searchTerm?: string;
  name?: string;
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  isUpcoming?: boolean;
};
