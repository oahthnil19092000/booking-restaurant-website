import { ITable } from 'src/app/models/table';

export interface ITableList {
    count: Number,
    rows: ITable[],
    page: Number,
    size: Number
}
