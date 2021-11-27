import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
    en: {
        translation: {}
    },
    ukr: {
        translation: {
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
            totalAmount: "Загальна к-сть",
            Placed: "Прийнято",
            Processed: "Оброблено",
            Delivered: "Доставленно",
            Complete: "Завершено",
            Cancel: 'Відміна'
        }
    }
};

export const initializeI18n = (lng) => {
    i18n
        .use(initReactI18next)
        .init({
            resources,
            lng,
            fallbackLng: 'ukr',
            interpolation: {
                escapeValue: false
            }
        }).then(r => r);
};
