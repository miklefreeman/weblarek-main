import { IBuyer, TPayment, TErrors } from "../../types/index.ts";

export class Buyer {
    protected buyer: IBuyer = {
        payment: '',  // ✅ теперь пустая строка допустима для TPayment
        email: '',
        phone: '',
        address: '',
    };

    constructor() {}

    setPayment(value: TPayment): void {
        this.buyer.payment = value;
    }

    setAddress(value: string): void {
        this.buyer.address = value;
    }

    setEmail(value: string): void {
        this.buyer.email = value;
    }

    setPhone(value: string): void {
        this.buyer.phone = value;
    }

    validate(): TErrors {
        const err: TErrors = {};
        if (!this.buyer.payment) err.payment = 'Не выбран вид оплаты';
        if (!this.buyer.email) err.email = 'Укажите адрес электронной почты';
        if (!this.buyer.phone) err.phone = 'Укажите номер мобильного телефона';
        if (!this.buyer.address) err.address = 'Укажите адрес';
        return err;
    }

    getAllInfo(): IBuyer {
        return { ...this.buyer };
    }

    clearAll(): void {
        this.buyer = {
            payment: '',
            email: '',
            phone: '',
            address: '',
        };
    }
}