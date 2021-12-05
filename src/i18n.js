import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {format as formatDate, isDate} from "date-fns";
import {enUS as en, uk as ukr} from "date-fns/esm/locale"

const locales = {en, ukr};

const resources = {
    en: {
        translation: {
            "formattedDate": "{{date, dd MMM yyyy}}",
            'Placed at': 'Placed at {{date, dd MMM yyyy}}',
        }
    },
    ukr: {
        translation: {
            'Placed at': 'Прийнято {{date, dd MMM yyyy}}',
            "formattedDate": "{{date, dd MMM yyyy}}",
            'Language changed': 'Мову змінено',
            'Blank Page': 'Порожня Сторінка',
            'Card Headers': 'Заголово Карочки',
            'Data States': 'Стани Данних',
            'Data Stats': 'Статистика Данних',
            'General Settings': 'Загальні Налаштування',
            'Image Uploader': 'Завантаження Картинки',
            'Page Headers': 'Заголовок Сторінки',
            'Create Order': 'Створити Замовлення',
            'Customer Email': 'Електронна Адреса Клієнта',
            'Customer Name': "Iм'я Клієнта",
            'Email Address': 'Електронна Адреса',
            'In Progress': 'В Роботі',
            "Order ID": "#ID",
            'Add Filter': 'Добавити Фільтр',
            'Add Item': 'Добавити Товар',
            'Remove': 'Видалити',
            'Total Amount': 'Сума',
            'not equal': 'не дорівнює',
            'greater than': 'більше ніж',
            'less than': 'менше ніж',
            'is after': 'після',
            'is before': 'перед',
            'Discount (%)': 'Знижка (%)',
            "Line Items": 'Список Товарів',
            'Order Info': 'Інформація Замовлення',
            'Delivery Address': 'Локація Доставки',
            'Nova Poshta #': 'Нова Пошта №',
            'Payment Status': 'Статус Оплати',
            'Ready for Shipment': 'Готово для відправки',
            'Branch Number': 'Номер Відділення',
            'Nova Poshta': 'Нова Пошта',
            'Save Changes': 'Зберегти Зміни',
            'Order Status': 'Статус Замовлення',
            'Mark as Paid': 'Позначити як оплачено',
            'Mark as Duplicate': 'Позначити як дублікат',
            'Delete Order': 'Видалити Замовлення',
            'Cancel Order': 'Скасувати Замовлення',
            'Edit order': 'Редагувати Замовлення',
            'Mark Order as paid': 'Позначити замовлення як оплачене',
            'Additional Notes': 'Додаткові нотатки',
            'Full Name': 'П.І.Б',
            'City/Village, District, Region': 'Місто/Село, Район, Область',
            'Item Name': 'Назва Товару',
            'Final Total': 'Загальна Сума',
            "Are you sure you want to mark this order as paid? This can't be undone.": "Ви впевненні, що хочете позначити замовлення, як оплачене?",
            "Branch number is required": "Номер відділення є обов'язковим полем",
            "Must be a number": "Значення повинно бути числом",
            "Value cannot be less then 0": "Значення не може бути меншим за 0",
            "Only integers are allowed": "Дозволені лише цілі числа",
            "Customer Full Name is required": "П.І.Б клієнта є обов'язковим полем",
            "Loading resource data": "Загрузка даних...",
            Account: 'Аккаунт',
            Activity: 'Активність',
            Billing: 'Оплата',
            Create: 'Створити',
            Customers: 'Клієнти',
            Details: 'Деталі',
            Inputs: 'Вхідні Данні',
            Insights: 'Інсайди',
            Inventory: 'Склад',
            Invoices: 'Чеки',
            List: 'Список',
            Lists: 'Списки',
            Notifications: 'Нотифікації',
            Onboarding: 'Onboarding',
            Orders: 'Замовлення',
            Organization: 'Організація',
            Overview: 'Огляд',
            Preview: 'Попередній Огляд',
            Products: 'Товари',
            Reports: 'Звіти',
            Sales: 'Продажі',
            Summary: 'Інформація',
            Tables: 'Таблиці',
            Team: 'Команда',
            totalAmount: 'Загальна к-сть',
            Placed: 'Прийнято',
            Processed: 'Обробленно',
            Delivered: 'Доставлено',
            Complete: 'Завершено',
            complete: 'Завершено',
            Ready: 'Готово до відправлення',
            Shipped: 'Відправлено',
            Returned: 'Поверненно',
            Cancel: 'Відміна',
            Add: 'Добавити',
            All: 'Всі',
            Filter: 'Фільтр',
            Reset: 'Скинути',
            Total: 'Сума',
            Status: 'Статус',
            Address: 'Адреса',
            Phone: 'Телефон',
            Customer: 'Клієнт',
            Created: 'Дата',
            equal: 'дорівнює',
            contains: 'містить',
            Where: 'Де',
            Name: "Ім'я",
            Cost: 'Ціна',
            Qty: 'К-сть',
            Subtotal: 'Сума без знижок',
            Prepayment: 'Предоплата',
            Paid: 'Оплачено',
            Unpaid: 'Не оплачено',
            Edit: 'Редагувати',
            Courier: 'Сервіс Доставки',
            Actions: 'Дії',
            Updated: 'Оновленно',
            Confirm: 'Підтвердити',
            Delete: 'Видалити',
            Refund: 'Повернення',
            Order: 'Замовлення',
            Item: 'Товар'
        }
    }
};

export const initializeI18n = (lng) => {
    i18n.use(initReactI18next)
        .init({
            resources,
            lng,
            fallbackLng: 'en',
            interpolation: {
                format: (value, format) => {
                    if (isDate(value)) {
                        const locale = locales[lng];
                        return formatDate(value, format, {locale});
                    }

                    return value;
                },
                escapeValue: false
            }
        }).then(r => r);
};
