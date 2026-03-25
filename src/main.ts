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

// Проверка методов для работы с выбранным товаром
console.log('\n1.1. Тестирование выбранного товара:');
const selectedProduct = apiProducts.items[2];
productsModel.setProduct(selectedProduct);
console.log('Установили выбранный товар:', selectedProduct.title);
console.log('Получение выбранного товара:', productsModel.getProduct());
console.log('Проверка: выбранный товар соответствует установленному:', 
    productsModel.getProduct()?.id === selectedProduct.id ? '✅' : '❌');

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

// Тестирование с корректными данными
buyerModel.setPayment('online');
buyerModel.setAddress('ул. Тестовая, д.1');
buyerModel.setEmail('test@example.com');
buyerModel.setPhone('+79991234567');
console.log('После заполнения корректными данными:', buyerModel.getAllInfo());
console.log('Валидация корректных данных:', buyerModel.validate());

// Тестирование валидации с некорректными данными
console.log('\n3.1. Тестирование валидации с некорректными данными:');
buyerModel.clearAll();
console.log('После очистки (все поля пустые):', buyerModel.getAllInfo());
console.log('Валидация пустых данных:', buyerModel.validate());

// Заполняем только часть полей
buyerModel.setPayment('online');
buyerModel.setAddress('ул. Тестовая, д.1');
console.log('После заполнения только payment и address:', buyerModel.getAllInfo());
console.log('Валидация (должны быть ошибки по email и phone):', buyerModel.validate());

// Проверка, что валидация возвращает объект с правильными ключами
const validationErrors = buyerModel.validate();
console.log('Ошибки валидации:', Object.keys(validationErrors).length > 0 ? validationErrors : 'Нет ошибок');

// Очищаем данные
buyerModel.clearAll();
console.log('После полной очистки:', buyerModel.getAllInfo());

// ========== РАБОТА С API ==========
console.log('\n=== ЗАПРОС К СЕРВЕРУ ===');

const api = new WebLarekAPI(API_URL);

api.getProductList()
    .then(items => {
        // Добавляем CDN к изображениям
        const itemsWithImages = items.map(item => ({
            ...item,
            image: CDN_URL + item.image
        }));
        console.log('Товары с сервера:', itemsWithImages);
        productsModel.setItems(itemsWithImages);
        console.log('Сохранено в модель каталога:', productsModel.getItems());
        console.log('Количество товаров с сервера:', productsModel.getItems().length);
    })
    .catch(err => console.error('Ошибка при загрузке товаров:', err));