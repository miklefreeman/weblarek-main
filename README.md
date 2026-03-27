
Класс Component
Базовый класс для всех компонентов интерфейса.

Поля:

container: HTMLElement — корневой DOM элемент компонента.

Методы:

render(data?: Partial<T>): HTMLElement — обновляет данные и возвращает DOM-элемент.

setImage(element: HTMLImageElement, src: string, alt?: string): void — утилитарный метод для работы с изображениями.

Класс Api
Базовый класс для работы с API.

Поля:

baseUrl: string — базовый адрес сервера

options: RequestInit — заголовки запросов

Методы:

get(uri: string): Promise<object> — GET запрос

post(uri: string, data: object, method?: ApiPostMethods): Promise<object> — POST запрос

handleResponse(response: Response): Promise<object> — обработка ответа сервера

Класс EventEmitter
Брокер событий для связи слоев приложения.

Методы:

on<T>(event: EventName, callback: (data: T) => void): void — подписка на событие

emit<T>(event: string, data?: T): void — инициализация события

trigger<T>(event: string, context?: Partial<T>): (data: T) => void — создание триггера события

Типы данных
Товар (IProduct)
typescript
interface IProduct {
    id: string;           // уникальный идентификатор товара
    description: string;  // подробное описание товара
    image: string;        // путь к изображению товара
    title: string;        // название товара
    category: string;     // категория товара (например, "софт", "хард", "другое")
    price: number | null; // цена товара (null означает "бесценно" или недоступно)
}
Покупатель (IBuyer)
typescript
interface IBuyer {
    payment: TPayment;   // способ оплаты
    email: string;       // электронная почта покупателя
    phone: string;       // номер телефона покупателя
    address: string;     // адрес доставки
}

type TPayment = '' | 'online' | 'offline'; // тип для способа оплаты (пустая строка для начального состояния)
Заказ (IOrder, IOrderResponse)
typescript
interface IOrder extends IBuyer {
    total: number;       // общая стоимость заказа
    items: string[];     // массив id выбранных товаров
}

interface IOrderResponse {
    id: string;          // идентификатор заказа, присвоенный сервером
    total: number;       // итоговая сумма заказа
}

type TErrors = Partial<Record<keyof IBuyer, string>>; // тип для ошибок валидации
Модели данных
Класс Products (Catalog)
Хранит массив всех товаров и выбранный товар.

Методы:

setItems(items: IProduct[]): void — сохраняет массив товаров

getItems(): IProduct[] — возвращает массив товаров

setProduct(item: IProduct): void — сохраняет выбранный товар

getProduct(): IProduct | null — возвращает выбранный товар

getProductById(id: string): IProduct | undefined — возвращает товар по id

Класс Basket (Cart)
Хранит товары, выбранные пользователем для покупки.

Методы:

getProductsList(): IProduct[] — возвращает массив товаров в корзине

addProduct(item: IProduct): void — добавляет товар в корзину

removeProduct(id: string): void — удаляет товар из корзины по id

getAmount(): number — возвращает количество товаров в корзине

getTotal(): number — возвращает общую стоимость товаров

doesItemExist(id: string): boolean — проверяет наличие товара в корзине

clearAll(): void — очищает корзину

Класс Buyer
Хранит данные покупателя для оформления заказа.

Методы:

setPayment(value: TPayment): void — сохраняет способ оплаты

setAddress(value: string): void — сохраняет адрес

setEmail(value: string): void — сохраняет email

setPhone(value: string): void — сохраняет телефон

getAllInfo(): IBuyer — возвращает все данные покупателя

validate(): TErrors — валидирует данные, возвращает объект с ошибками

clearAll(): void — очищает все данные

Слой коммуникации
Класс WebLarekAPI
Использует композицию с классом Api (содержит экземпляр Api внутри). Отвечает за взаимодействие с сервером.

Конструктор:

constructor(baseUrl: string, options?: RequestInit) — создает экземпляр Api для работы с сервером

Методы:

getProductList(): Promise<IProduct[]> — GET запрос на /product, возвращает массив товаров

getProductItem(id: string): Promise<IProduct> — GET запрос на /product/{id}, возвращает товар по идентификатору

orderProducts(order: IOrder): Promise<IOrderResponse> — POST запрос на /order, отправляет данные заказа на сервер

Точка входа (main.ts)
В первой части main.ts выполняет:

Создание экземпляров моделей:

productsModel — каталог товаров

basketModel — корзина

buyerModel — данные покупателя

Тестирование всех методов моделей с выводом в консоль:

Каталог: setItems, getItems, getProductById, setProduct, getProduct

Корзина: addProduct, removeProduct, getAmount, getTotal, doesItemExist, clearAll

Покупатель: setPayment, setAddress, setEmail, setPhone, getAllInfo, validate (с корректными и некорректными данными), clearAll

Запрос к серверу:

Вызов WebLarekAPI.getProductList()

Добавление CDN к изображениям товаров

Сохранение полученных товаров в модель каталога

Вывод результатов в консоль