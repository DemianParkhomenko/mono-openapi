/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/bank/currency': {
    /**
     * Отримання курсів валют
     * @description Отримати базовий перелік курсів валют monobank. Інформація кешується та оновлюється не частіше 1 разу на 5 хвилин.
     */
    get: {
      responses: {
        /** @description Інформація про курс валют */
        200: {
          content: {
            'application/json': components['schemas']['CurrencyInfo'];
          };
        };
      };
    };
  };
  '/personal/client-info': {
    /**
     * Інформація про клієнта
     * @description Отримання інформації про клієнта та переліку його рахунків. Обмеження на використання функції не частіше ніж 1 раз у 60 секунд.
     */
    get: {
      parameters: {
        header: {
          /**
           * @description Token для особистого доступу до API
           * @example u3AulkpZFI1lIuGsik6vuPsVWqN7GoWs6o_MO2sdf301
           */
          'X-Token': string;
        };
      };
      responses: {
        /** @description Statement list */
        200: {
          content: {
            'application/json': components['schemas']['UserInfo'];
          };
        };
      };
    };
  };
  '/personal/webhook': {
    /**
     * Встановлення WebHook
     * @description Встановлення URL користувача:
     * - Для підтвердження коректності наданої адреси, на неї надсилається GET-запит. Сервер має відповісти строго HTTP статус-кодом 200, і ніяким іншим. Якщо валідацію пройдено, на задану адресу починають надсилатися POST запити з подіями.
     * - Події надсилаються у наступному вигляді: POST запит на задану адресу у форматі `{type:"StatementItem", data:{account:"...", statementItem:{#StatementItem}}}`. Якщо сервіс користувача не відповість протягом 5с на команду, сервіс повторить спробу ще через 60 та 600 секунд. Якщо на третью спробу відповідь отримана не буде, функція буде вимкнута. Відповідь сервера має строго містити HTTP статус-код 200.
     */
    post: {
      parameters: {
        header: {
          /** @description Token для особистого доступу до API */
          'X-Token': string;
        };
      };
      /** @description Optional description in *Markdown* */
      requestBody: {
        content: {
          'application/json': components['schemas']['SetWebHook'];
        };
      };
      responses: {
        /** @description ok */
        200: {
          content: never;
        };
      };
    };
  };
  '/personal/statement/{account}/{from}/{to}': {
    /**
     * Виписка
     * @description Отримання виписки за час від {from} до {to} часу в секундах в форматі Unix time Максимальний час за який можливо отримувати виписку 31 доба + 1 година (2682000 секунд) Обмеження на використання функції не частіше ніж 1 раз у 60 секунд.
     */
    get: {
      parameters: {
        header: {
          /** @description Token для особистого доступу до API */
          'X-Token': string;
        };
        path: {
          /** @description Ідентифікатор рахунку з переліку Statement list або 0 - дефолтний рахунок. */
          account: string;
          /**
           * @description Початок часу виписки.
           * @example 1546304461
           */
          from: string;
          /**
           * @description Останній час виписки (якщо відсутній, буде використовуватись поточний час).
           * @example 1546306461
           */
          to: string;
        };
      };
      responses: {
        /** @description Statement list */
        200: {
          content: {
            'application/json': components['schemas']['StatementItems'];
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** @description URL для надсиляння подій по зміні балансу рахунку */
    SetWebHook: {
      /** @example https://mysomesite.copm/some_random_data_for_security */
      webHookUrl?: string;
    };
    /** @description Опис клієнта та його рахунків. */
    UserInfo: {
      /**
       * @description Ідентифікатор клієнта (зівпадає з id для send.monobank.ua)
       * @example 3MSaMMtczs
       */
      clientId?: string;
      /**
       * @description Ім'я клієнта
       * @example Мазепа Іван
       */
      name?: string;
      /**
       * @description URL для надсиляння подій по зміні балансу рахунку
       * @example https://mysomesite.copm/some_random_data_for_security
       */
      webHookUrl?: string;
      /**
       * @description Перелік прав, які які надає сервіс (1 літера на 1 permission).
       * @example psf
       */
      permissions?: string;
      /** @description Перелік доступних рахунків */
      accounts?: {
        /**
         * @description Ідентифікатор рахунку
         * @example kKGVoZuHWzqVoZuH
         */
        id?: string;
        /**
         * @description Ідентифікатор для сервісу https://send.monobank.ua/{sendId}
         * @example uHWzqVoZuH
         */
        sendId?: string;
        /**
         * Format: int64
         * @description Баланс рахунку в мінімальних одиницях валюти (копійках, центах)
         * @example 10000000
         */
        balance?: number;
        /**
         * Format: int64
         * @description Кредитний ліміт
         * @example 10000000
         */
        creditLimit?: number;
        /**
         * @description Тип рахунку
         * @example black
         * @enum {string}
         */
        type?:
          | 'black'
          | 'white'
          | 'platinum'
          | 'iron'
          | 'fop'
          | 'yellow'
          | 'eAid';
        /**
         * Format: int32
         * @description Код валюти рахунку відповідно ISO 4217
         * @example 980
         */
        currencyCode?: number;
        /**
         * @description Тип кешбеку який нараховується на рахунок
         * @example UAH
         * @enum {string}
         */
        cashbackType?: 'None' | 'UAH' | 'Miles';
        /**
         * @description Перелік замаскованних номерів карт (більше одного може бути у преміальних карт)
         * @example [
         *   "537541******1234"
         * ]
         */
        maskedPan?: unknown[];
        /**
         * @description IBAN рахунку
         * @example UA733220010000026201234567890
         */
        iban?: string;
      }[];
    };
    /** @description Перелік транзакцій за вказанний час */
    StatementItems: {
      /**
       * @description Унікальний id транзакції
       * @example ZuHWzqkKGVo=
       */
      id?: string;
      /**
       * Format: int64
       * @description Час транзакції в секундах в форматі Unix time
       * @example 1554466347
       */
      time?: number;
      /**
       * @description Опис транзакцій
       * @example Покупка щастя
       */
      description?: string;
      /**
       * Format: int32
       * @description Код типу транзакції (Merchant Category Code), відповідно ISO 18245
       * @example 7997
       */
      mcc?: number;
      /**
       * Format: int32
       * @description Оригінальний код типу транзакції (Merchant Category Code), відповідно ISO 18245
       * @example 7997
       */
      originalMcc?: number;
      /**
       * @description Статус блокування суми (детальніше у [wiki](https://en.wikipedia.org/wiki/Authorization_hold))
       * @example false
       */
      hold?: boolean;
      /**
       * Format: int64
       * @description Сума у валюті рахунку в мінімальних одиницях валюти (копійках, центах)
       * @example -95000
       */
      amount?: number;
      /**
       * Format: int64
       * @description Сума у валюті транзакції в мінімальних одиницях валюти (копійках, центах)
       * @example -95000
       */
      operationAmount?: number;
      /**
       * Format: int32
       * @description Код валюти рахунку відповідно ISO 4217
       * @example 980
       */
      currencyCode?: number;
      /**
       * Format: int64
       * @description Розмір комісії в мінімальних одиницях валюти (копійках, центах)
       * @example 0
       */
      commissionRate?: number;
      /**
       * Format: int64
       * @description Розмір кешбеку в мінімальних одиницях валюти (копійках, центах)
       * @example 19000
       */
      cashbackAmount?: number;
      /**
       * Format: int64
       * @description Баланс рахунку в мінімальних одиницях валюти (копійках, центах)
       * @example 10050000
       */
      balance?: number;
      /**
       * @description Коментар до переказу, уведений користувачем. Якщо не вказаний, поле буде відсутнім
       * @example За каву
       */
      comment?: string;
      /**
       * @description Номер квитанции для check.gov.ua. Поле може бути відсутнім
       * @example XXXX-XXXX-XXXX-XXXX
       */
      receiptId?: string;
      /**
       * @description ЄДРПОУ контрагента, присутній лише для елементів виписки рахунків ФОП
       * @example 3096889974
       */
      counterEdrpou?: string;
      /**
       * @description IBAN контрагента, присутній лише для елементів виписки рахунків ФОП
       * @example UA898999980000355639201001404
       */
      counterIban?: string;
    }[];
    /** @description Перелік курсів. Кожна валютна пара може мати одне і більше полів з  rateSell, rateBuy, rateCross. */
    CurrencyInfo: {
      /**
       * Format: int32
       * @description Код валюти рахунку відповідно ISO 4217
       * @example 840
       */
      currencyCodeA?: number;
      /**
       * Format: int32
       * @description Код валюти рахунку відповідно ISO 4217
       * @example 980
       */
      currencyCodeB?: number;
      /**
       * Format: int64
       * @description Час курсу в секундах в форматі Unix time
       * @example 1552392228
       */
      date?: number;
      /**
       * Format: float
       * @example 27
       */
      rateSell?: number;
      /**
       * Format: float
       * @example 27.2
       */
      rateBuy?: number;
      /**
       * Format: float
       * @example 27.1
       */
      rateCross?: number;
    }[];
    Error: {
      /** @description Текст помилки для кінцевого користувача, для автоматичного оброблення потрібно аналізувати HTTP код відповіді (200, 404, 429 та інші) */
      errorDescription?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
