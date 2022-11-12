import { ITypeParty } from './type-party';
export interface ITypePartyList {
  count: Number;
  rows: ITypeParty[];
  page: Number;
  size: Number;
}
