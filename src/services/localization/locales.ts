export enum LocaleType {
  ru_RU = "ru_RU",
  en_GB = "en_GB"
};

export interface Locale {
  copyrightText: string,
  allRightsReserved: string,
  mainLayerTitle: string,
  mainLayerParagraphs: string[],
  mainLayerCompaniesTitle: string,
  viewVacancies: string,
  putVacancy: string,
  joinOurTelegram: string,
  home: string,
  vacancies: string,
  vacancy: string,
  postVacancy: string,
  watchAllVacancies: string,
  telegramGroupName: string,
  russian: string,
  english: string,
  filter: string,
  level: string,
  stack: string,
  location: string,
  city: string,
  salary: string,
  all: string,
  remote: string,
  remoteOnly: string,
  vacancyLevelIntern: string,
  vacancyLevelJunior: string,
  vacancyLevelMiddle: string,
  vacancyLevelSenior: string,
  vacancyLevelCTO: string,
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
  companyName: string,
  EmptyValidationError: string
};

export const ru_RU: Locale = {
  copyrightText: "© 2020 Allisto",
  allRightsReserved: "Все права защищены.",
  mainLayerTitle: "Кто мы",
  mainLayerParagraphs: [
    "Мы – крупный портал, размещающий лучшие вакансии в сфере IT. \
    Коллегам мы предоставляем доступ к лучшим предложениям на рынке, \
    рекрутерам — таргетированное размещение.",
    "Все вакансии проходят тщательную валидацию на предмет соответствия \
    правилам портала. Вакансии крупных компаний размещаются бесплатно \
    в кратчайшие сроки."
  ],
  mainLayerCompaniesTitle: "Нам доверяют",
  viewVacancies: "Посмотреть",
  putVacancy: "Разместить",
  joinOurTelegram: "Присоединяйтесь к нам в Telegram:",
  home: "Домой",
  vacancies: "Вакансии",
  vacancy: "Вакансия",
  postVacancy: "Разместить вакансию",
  watchAllVacancies: "Посмотреть все",
  telegramGroupName: "@sns_deanon",
  russian: "Русский",
  english: "English",
  filter: "Фильтр",
  level: "Уровень",
  stack: "Область",
  location: "Локация",
  city: "Город",
  salary: "Ставка",
  all: "Все",
  remote: "Удаленно",
  remoteOnly: "Только удаленно",
  vacancyLevelIntern: "Intern",
  vacancyLevelJunior: "Junior",
  vacancyLevelMiddle: "Middle",
  vacancyLevelSenior: "Senior",
  vacancyLevelCTO: "CTO",
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
  respondInTelegram: "Откликнуться в Telegram",
  companyName: "Название компании",
  EmptyValidationError: "Обязательное поле"
};

export const en_GB: Locale = {} as Locale;

// export const en_GB: Locale = {};
