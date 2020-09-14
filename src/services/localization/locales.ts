export enum LocaleType {
  ru_RU = "ru_RU",
  en_GB = "en_GB"
}

export interface Locale {
  copyrightText: string,
  allRightsReserved: string,
  mainLayerTitle: string,
  mainLayerParagraphs: string[],
  viewVacancies: string,
  putVacancy: string,
  joinOurTelegram: string,
  home: string,
  vacancies: string,
  vacancy: string,
  postVacancy: string,
  watchAllVacancies: string,
  russian: string,
  english: string,
  filter: string,
  level: string,
  stack: string,
  location: string,
  city: string,
  offer: string,
  all: string,
  remote: string,
  remoteOnly: string,
  vacancySkillFrontend: string,
  vacancySkillBackend: string,
  vacancySkillFullstack: string,
  vacancySkillDevOps: string,
  vacancySkillAndroid: string,
  vacancySkilliOS: string,
  vacancySkillMobile: string,
  vacancySkillDesktop: string,
  vacancySkillDataScience: string,
  vacancySkillSecurityEngineer: string,
  respondInTelegram: string,
  company: string,
  companyName: string,
  companyIndustry: string,
  companyWebsite: string,
  locationCountry: string,
  locationCity: string,
  candidate: string,
  candidateSkill: string,
  candidateLevel: string,
  candidateStack: string,
  salaryFrom: string,
  salaryTo: string,
  description: string,
  contacts: string,
  contactsEmail: string,
  contactsPhone: string,
  EmptyValidationError: string,
  ValidationErrorCompanyProhibitedSymbols: string,
  ValidationErrorCompanyTooShort: string,
  ValidationErrorCompanyTooLong: string,
  ValidationErrorCompanySideSpaces: string,
  ValidationErrorCompanyDoubledSpaces: string,
  ValidationErrorSalaryNotOnlyNumbers: string,
  ValidationErrorSalaryTooSmallNumber: string,
  ValidationErrorSalaryTooBigNumber: string,
  ValidationErrorSalaryLessThan: (bound: number) => string,
  ValidationErrorStartsNotWithSchema: string,
  ValidationErrorSpaces: string,
  ValidationErrorSalaryNotEmail: string,
  ValidationErrorSalaryNotTelegram: string,
  ValidationErrorSalaryNotPhone: string,
  vacancyPostFormCompanyDescription: string,
  vacancyPostFormCandidateDescription: string,
  vacancyPostFormOfferDescription: string
}

export const ru_RU: Locale = {
  copyrightText: "© 2020 Allisto",
  allRightsReserved: "Все права защищены.",
  mainLayerTitle: "Кто мы",
  mainLayerParagraphs: [
    "Мы\u00a0– крупный портал, размещающий лучшие вакансии в\u00a0сфере IT. \
    Коллегам мы предоставляем доступ к\u00a0лучшим предложениям на\u00a0рынке, \
    рекрутерам\u00a0— таргетированное размещение.",
    "Все вакансии проходят тщательную валидацию на\u00a0предмет соответствия \
    правилам портала. Вакансии крупных компаний размещаются бесплатно \
    в\u00a0кратчайшие сроки."
  ],
  viewVacancies: "Посмотреть",
  putVacancy: "Разместить",
  joinOurTelegram: "Присоединяйтесь к нам в\u00a0Telegram:",
  home: "Домой",
  vacancies: "Вакансии",
  vacancy: "Вакансия",
  postVacancy: "Разместить",
  watchAllVacancies: "Посмотреть все",
  russian: "Русский",
  english: "English",
  filter: "Фильтр",
  level: "Уровень",
  stack: "Область",
  location: "Локация",
  city: "Город",
  offer: "Оффер",
  all: "Все",
  remote: "Удаленно",
  remoteOnly: "Только удаленно",
  vacancySkillFrontend: "Frontend",
  vacancySkillBackend: "Backend",
  vacancySkillFullstack: "Fullstack",
  vacancySkillDevOps: "Dev Ops",
  vacancySkillAndroid: "Android",
  vacancySkilliOS: "iOS",
  vacancySkillMobile: "Mobile",
  vacancySkillDesktop: "Desktop",
  vacancySkillDataScience: "Data Science",
  vacancySkillSecurityEngineer: "Security Engineer",
  respondInTelegram: "Откликнуться в\u00a0Telegram",
  company: "Компания",
  companyName: "Название",
  companyIndustry: "Индустрия",
  companyWebsite: "Сайт",
  locationCountry: "Страна",
  locationCity: "Город",
  candidate: "Кандидат",
  candidateSkill: "Область",
  candidateLevel: "Уровень",
  candidateStack: "Стэк",
  salaryFrom: "От ($)",
  salaryTo: "До ($)",
  description: "Описание",
  contacts: "Контакты",
  contactsEmail: "Почта",
  contactsPhone: "Телефон",
  EmptyValidationError: "Обязательное поле",
  ValidationErrorCompanyProhibitedSymbols: "Запрещенный символ",
  ValidationErrorCompanyTooShort: "Слишком короткая строка",
  ValidationErrorCompanyTooLong: "Слишком длинная строка",
  ValidationErrorCompanySideSpaces: "Пробелы в\u00a0начале и\u00a0конце строки запрещены",
  ValidationErrorCompanyDoubledSpaces: "Сдвоенные пробелы запрещены",
  ValidationErrorSalaryNotOnlyNumbers: "Разрешены только числа",
  ValidationErrorSalaryTooSmallNumber: "Слишком маленькое число",
  ValidationErrorSalaryTooBigNumber: "Слишком большое число",
  ValidationErrorSalaryLessThan:
    (bound: number): string => `Не\u00a0должно быть меньше ${bound}`,
  ValidationErrorStartsNotWithSchema: "Должно начинаться с\u00a0http:// или\u00a0https://",
  ValidationErrorSpaces: "Пробелы запрещены",
  ValidationErrorSalaryNotEmail: "Неверный формат email",
  ValidationErrorSalaryNotTelegram: "Неверный формат",
  ValidationErrorSalaryNotPhone: "Неверный формат. Пример: +7\u00a0999\u00a0018-99-33",
  vacancyPostFormCompanyDescription:
    "Указание ссылки на\u00a0специальную страницу с\u00a0детальной информацией \
    по\u00a0вакансии увеличивает шансы успешного подбора специалиста.",
  vacancyPostFormCandidateDescription:
    "Подробно указанный стек способствует поиску сотрудника.",
  vacancyPostFormOfferDescription:
    "Указывайте честную зарплатную вилку и\u00a0пишите подробное описание. \
    Откровенность\u00a0— залог установления доверительных отношений с\u00a0обеих сторон."
};

export const en_GB: Locale = {
  copyrightText: "© 2020 Allisto",
  allRightsReserved: "All rights reserved.",
  mainLayerTitle: "About",
  mainLayerParagraphs: [
    "We're a large web portal featuring the best IT vacancies around. \
    We provide access to the best offers on the market to our colleagues \
    and targeted job posting to HRs.",
    "All the vacancies are thoroughly validated and moderated. \
    Vacancies for big companies are posted for free, as soon as possible."
  ],
  viewVacancies: "Explore",
  putVacancy: "Post a job",
  joinOurTelegram: "Join us on\u00a0Telegram:",
  home: "Home",
  vacancies: "Jobs",
  vacancy: "Job",
  postVacancy: "Post",
  watchAllVacancies: "See all",
  russian: "Русский",
  english: "English",
  filter: "Filter",
  level: "Level",
  stack: "Stack",
  location: "Location",
  city: "City",
  offer: "Offer",
  all: "All",
  remote: "Remote",
  remoteOnly: "Remote only",
  vacancySkillFrontend: "Frontend",
  vacancySkillBackend: "Backend",
  vacancySkillFullstack: "Fullstack",
  vacancySkillDevOps: "Dev Ops",
  vacancySkillAndroid: "Android",
  vacancySkilliOS: "iOS",
  vacancySkillMobile: "Mobile",
  vacancySkillDesktop: "Desktop",
  vacancySkillDataScience: "Data Science",
  vacancySkillSecurityEngineer: "Security Engineer",
  respondInTelegram: "Respond over\u00a0Telegram",
  company: "Company",
  companyName: "Title",
  companyIndustry: "Industry",
  companyWebsite: "Website",
  locationCountry: "Country",
  locationCity: "City",
  candidate: "Candidate",
  candidateSkill: "Skill",
  candidateLevel: "Level",
  candidateStack: "Stack",
  salaryFrom: "From\u00a0($)",
  salaryTo: "To\u00a0($)",
  description: "Description",
  contacts: "Contacts",
  contactsEmail: "E-mail",
  contactsPhone: "Mobile number",
  EmptyValidationError: "Required",
  ValidationErrorCompanyProhibitedSymbols: "Prohibited symbol",
  ValidationErrorCompanyTooShort: "Too short",
  ValidationErrorCompanyTooLong: "Too long",
  ValidationErrorCompanySideSpaces: "Please remove the spaces at the beginning and the end",
  ValidationErrorCompanyDoubledSpaces: "Please remove doubled spaces",
  ValidationErrorSalaryNotOnlyNumbers: "Number only here",
  ValidationErrorSalaryTooSmallNumber: "To small",
  ValidationErrorSalaryTooBigNumber: "Too big",
  ValidationErrorSalaryLessThan:
    (bound: number): string => `Shouldn't be less than ${bound}`,
  ValidationErrorStartsNotWithSchema: "Should start with http:// or https://",
  ValidationErrorSpaces: "No spaces here",
  ValidationErrorSalaryNotEmail: "Wrong e-mail format",
  ValidationErrorSalaryNotTelegram: "Wrong format",
  ValidationErrorSalaryNotPhone: "Wrong format. Should be: +44\u00a007123\u00a0456789",
  vacancyPostFormCompanyDescription:
    "If you include a link to detailed information about your company \
    it will be easier for you to find a good candidate.",
  vacancyPostFormCandidateDescription:
    "The more detailed stack, the better.",
  vacancyPostFormOfferDescription:
    "Specify a fair salary range and write a good job description. \
    Be frank: it's good to have candidates at “hello”!"
};
