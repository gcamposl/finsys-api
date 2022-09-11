import { ObjectId } from 'mongodb';

export interface accountProps {
  description: string;
  value: number;
  type: string;
  comment?: string;
  payDay: Date;
  id?: ObjectId;
}

export class Account {
  private props: accountProps;

  constructor(props: accountProps) {
    const { payDay } = props;
    const today = new Date();

    // if (!this.props.id) {
    //   this.props.id = new ObjectId();
    // }

    if (payDay <= today) {
      throw new Error('invalid payday');
    }

    this.props = props;
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get value() {
    return this.props.value;
  }

  set value(value: number) {
    this.props.value = value;
  }

  get type() {
    return this.props.type;
  }

  set type(type: string) {
    this.props.type = type;
  }

  get comment() {
    return this.props.comment;
  }

  set comment(comment: string) {
    this.props.comment = comment;
  }

  get payDay() {
    return this.props.payDay;
  }

  set payDay(payDay: Date) {
    this.props.payDay = payDay;
  }

  get id() {
    return this.props.id;
  }

  public set id(id: ObjectId) {
    this.props.id = id;
  }
}
