import { WebLarekAPI } from "./components/WebLarekAPI";
import { API_URL, CDN_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";
import { Products } from "./components/models/CProducts";
import { Basket } from "./components/models/CBasket";
import { Buyer } from "./components/models/CBuyer";

// Создание экземпляров моделей
const productsModel = new Products();
const basketModel = new Basket();
const buyerModel = new Buyer();

// ========== ТЕСТИРОВАНИЕ МЕТОДОВ МОДЕЛЕЙ ==========
console.log('=== ТЕСТИРОВАНИЕ МОДЕЛЕЙ ДАННЫХ ===');

// 1. Тестируем каталог товаров с тестовыми данными
console.log('1. Тестирование каталога товаров:');
productsModel.setItems(apiProducts.items);
console.log('Товары в каталоге:', productsModel.getItems());
console.log('Количество товаров:', productsModel.getItems().length);

// Проверка получения товара по ID
const testProduct = productsModel.getProductById(apiProducts.items[0].id);
console.log('Товар по ID:', testProduct);

// 2. Тестируем корзину
console.log('\n2. Тестирование корзины:');
console.log('Корзина пуста:', basketModel.getProductsList());
basketModel.addProduct(apiProducts.items[0]);
console.log('Добавили товар, в корзине:', basketModel.getAmount(), 'товар');
console.log('Сумма корзины:', basketModel.getTotal());
basketModel.addProduct(apiProducts.items[1]);
console.log('Добавили ещё товар, в корзине:', basketModel.getAmount(), 'товара');
console.log('Сумма корзины:', basketModel.getTotal());
console.log('Проверка наличия товара:', basketModel.doesItemExist(apiProducts.items[0].id));
basketModel.removeProduct(apiProducts.items[0].id);
console.log('Удалили товар, осталось:', basketModel.getAmount());
basketModel.clearAll();
console.log('Очистили корзину:', basketModel.getProductsList());

// 3. Тестируем данные покупателя
console.log('\n3. Тестирование данных покупателя:');
console.log('Начальные данные:', buyerModel.getAllInfo());
buyerModel.setPayment('online');
buyerModel.setAddress('ул. Тестовая, д.1');
buyerModel.setEmail('test@example.com');
buyerModel.setPhone('+79991234567');
console.log('После заполнения:', buyerModel.getAllInfo());
console.log('Валидация:', buyerModel.validate());
buyerModel.clearAll();
console.log('После очистки:', buyerModel.getAllInfo());

// ========== РАБОТА С API ==========
console.log('\n=== ЗАПРОС К СЕРВЕРУ ===');

const api = new WebLarekAPI(CDN_URL, API_URL);

api.getProductList()
    .then(items => {
        console.log('Товары с сервера:', items);
        productsModel.setItems(items);
        console.log('Сохранено в модель каталога:', productsModel.getItems());
    })
    .catch(err => console.error('Ошибка при загрузке товаров:', err));