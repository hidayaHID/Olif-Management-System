import { Donation } from './donation';

export class House {
  public houseId!: number;
  public houseNumber!: string;
  public guardianHouse!: string;
  public address!: string;
  public location!: string;
  public status!: string;
  public latitude!: number;
  public longitude!: number;
  public donations!: Donation[];
}
