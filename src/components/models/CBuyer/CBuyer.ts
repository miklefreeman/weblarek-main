import { IBuyer } from "../../../types/IBuyer.ts";
import { TPayment } from "../../../types/TPayment.ts";
import { TErrors } from "../../../types/TErrors.ts";
import { IEvents } from "../../base/Events.ts";

export class Buyer {
  protected buyer: IBuyer = {
    payment: '',
    email: '',
    phone: '',
    address: '',
  };

  constructor(protected events: IEvents) {};

  setPayment(value: TPayment): void {
    this.buyer.payment = value;
    this.events.emit('order:form:render');
  };

  setAddress(value: string): void {
    this.buyer.address = value;
    this.events.emit('order:form:render');
  };

  setEmail(value: string): void {
    this.buyer.email = value;
    this.events.emit('contacts:form:render');
  };

  setPhone(value: string): void {
    this.buyer.phone = value;
    this.events.emit('contacts:form:render');
  };

  validate(): TErrors {
    const err: TErrors = {};
    if(this.buyer.payment === '') err.payment = 'Не выбран вид оплаты';
    if(this.buyer.email === '') err.email = 'Укажите адрес электронной почты';
    if(this.buyer.phone === '') err.phone = 'Укажите номер мобильного телефона';
    if(this.buyer.address === '') err.address = 'Укажите адрес';

    return err;
  };

  getAllInfo(): IBuyer {
    return {
      payment: this.buyer.payment,
      email: this.buyer.email,
      phone: this.buyer.phone,
      address: this.buyer.address,
    };
  };

  clearAll(): void {
    for (const property in this.buyer) {
      const keyProperty = property as keyof IBuyer;
      if(this.buyer[keyProperty] !== '') this.buyer[keyProperty] = '';
    };
  };

};