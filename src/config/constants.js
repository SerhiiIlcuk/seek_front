export const CANDIDATE = "candidate";

export const EMPLOYEE = "employee";

export const ADMIN = "admin";

export const EMPLOYEE_ROLES = {
   JOB: "job",
   PROFILE: "profile",
   NEWS: "news",
   USER: "user",
};

export const ADMIN_ROLES = {
   COMPANY: "company",
   USER: "user",
   NEWS: "news",
   ANALYTICS: "analytics"
};

export const whyHereTexts = [
   {
      id: "1",
      title: "Find Companies that are right for me"
   },
   {
      id: "2",
      title: "Find Jobs that are right for me"
   },
   {
      id: "3",
      title: "Read articles about tech"
   }
];

export const experienceLevels = [
   {
      id: "1",
      title: "1-3 Years",
   },
   {
      id: "2",
      title: "3-5 Years",
   },
   {
      id: "3",
      title: "5++ Years",
   },
];

export const companySizes = [
   {
      id: "1",
      value: {
         low: 0,
         high: 10,
      },
      title: "less than 10",
   },
   {
      id: "2",
      value: {
         low: 10,
         high: 50,
      },
      title: "10 - 50",
   },
   {
      id: "3",
      value: {
         low: 50,
         high: 250,
      },
      title: "50 - 250",
   },
   {
      id: "4",
      value: {
         low: 250,
         high: 1000,
      },
      title: "250 - 1000",
   },
   {
      id: "5",
      value: {
         low: 1000,
         high: -1,
      },
      title: "more than 1000",
   },
];

export const articleCategories = [
   {
      id: "siete",
      value: "Siete",
   },
   {
      id: "cinco",
      value: "Cinco",
   },
];

export const articleStatus = [
   {
      id: "draft",
      value: "Draft",
   },
   {
      id: "publish",
      value: "Publish",
   }
];

export const NEWS_PUBLISHED = "publish";
export const NEWS_DRAFT = "draft";
