import { ObjectId } from 'mongodb';

class Account {
  private _description: string;
  private _value: number;
  private _type: string;
  private _comment: string;
  private _id?: ObjectId;

  constructor() {}

  public get description() {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
  }

  public get value() {
    return this._value;
  }

  public set value(value: number) {
    this._value = value;
  }

  public get type() {
    return this._type;
  }

  public set type(type: string) {
    this._type = type;
  }

  public get comment() {
    return this._comment;
  }

  public set comment(comment: string) {
    this._comment = comment;
  }

  public get id() {
    return this._id;
  }

  public set id(id: ObjectId) {
    if (!id) {
      this._id = new ObjectId();
    }
  }
}

export { Account };
