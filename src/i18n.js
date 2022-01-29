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
            "Bulk Actions": "Застосувати до вибраних",
            "Ordered recently": "Нещодавно замовляли",
            "Search...": "Пошук...",
            "App Settings": "Налаштування Акаунта",
            "Account Settings": "Налаштування Акаунта",
            "Dark Mode": "Темний Режим",
            "Log out": "Вихід",
            "Upload new picture": "Завантажити нову картинку",
            "Change password": "Змінити Пароль",
            "Old password": "Старий пароль",
            "New password": "Новий пароль",
            "Job title": "Посада",
            "Email address": "Електронна адреса",
            "Recommended dimensions is 200x200, maximum file size is 5MB": "Рекомендоване розширення: 200x200, максимальний розмір файлу: 5Mb",
            "Save settings": "Зберегти налаштування",
            "Old password is required": "Старий пароль є обов'язковим полем",
            "New password is required": "Новий пароль є обов'язковим полем",
            "Delivery Address is required": "Адрес доставки є обов'язковим полем",
            "phone must be a valid phone number for region UA": "Невірний формат номеру телефона",
            "Phone is required": "Телефон є обов'язковим полем",
            "Delete user data": "Видалити інформацію про клієнта",
            "Delete User Data": "Видалити",
            "Are you sure you want to delete the user data? This can't be undone.": "Ви впевнені що хочете видалити дані цього клієнта? Дані не можливо буде відновити",
            "Update Customer": "Редагувати дані клієнта",
            "Latest Orders": "Останні Замовлення",
            "Contact Info": "Контактна інформація",
            "Team Notes": "Командні Нотатки",
            "Comment text...": "Текст коментаря...",
            "Create Product": "Створити товар",
            "Product name": "Назва товару",
            "Select images": "Вибрати фото",
            "Name is required": "Назва товару є обов'язковим полем",
            "price must be greater than or equal to 0": "Ціна повинна бути більшою або рівною 0",
            "Category is required": "Категорія є обов'язковим полем",
            "Status is required": "Статус є обов'язковим полем",
            "Price is required": "Ціна є обов'язковим полем",
            "In Stock": "В наявності",
            "Out of Stock": "Не в наявності",
            "This action is not available on demo": "Ця дія поки в процесі розробки і не є доступною",
            "Created Date": "Дата створення",
            "General Information": "Деталі",
            "Product Name": "Назва товару",
            "Delete Selected": "Видалити вибрані",
            "Edit Product": "Редагувати товар",
            "Product was successfully deleted": "Товар було успішно видалено",
            "Order was successfully deleted": "Замовлення було успішно видалено",
            Image: "Фото",
            Category: "Категорія",
            category: "Категорія",
            Description: "Опис",
            Upload: "Завантажити",
            Price: "Ціна",
            price: "Ціна",
            Account: 'Аккаунт',
            Returning: 'Робили повернення',
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
            Item: 'Товар',
            Menu: 'Меню',
            General: 'Загальні Налаштування',
            Settings: 'Налаштування',
            Send: 'Надіслати',
            Page: 'Сторінка',
            of: "з",
            Electronics: "Електроніка",
            Books: "Книги",
            Code: "Код"

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
