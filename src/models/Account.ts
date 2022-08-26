import { ObjectId } from 'mongodb';

export default class Account {
  constructor(
    public description: string,
    public value: number,
    public type: string,
    public comment: string,
    public id?: ObjectId
  ) {}
}
