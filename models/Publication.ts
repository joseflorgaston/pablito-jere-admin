import { PublicationImage } from './PublicationImage';
export interface Publication {
    id: number,
    title: string
    description: string
    publicationImages: PublicationImage[]
  }