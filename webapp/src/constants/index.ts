import {
    PATH_ABOUT,
    PATH_ACCOUNT,
    PATH_AUTH,
    PATH_BLOG,
    PATH_CALENDAR,
    PATH_CAREERS,
    PATH_CHANGELOG,
    PATH_CONTACTS,
    PATH_CORPORATE,
    PATH_DASHBOARD,
    PATH_DOCS,
    PATH_ERROR,
    PATH_FILE,
    PATH_GITHUB,
    PATH_INBOX,
    PATH_INVOICE,
    PATH_LANDING,
    PATH_LAYOUT,
    PATH_PROJECTS,
    PATH_SITEMAP,
    PATH_SOCIAL,
    PATH_SOCIALS,
    PATH_START,
    PATH_SUBSCRIPTION,
    PATH_USER_MGMT,
    PATH_USER_PROFILE,
} from './routes';

const DASHBOARD_ITEMS = [
  { title: 'default', path: PATH_DASHBOARD.default },
  { title: 'projects', path: PATH_DASHBOARD.projects },
  { title: 'ecommerce', path: PATH_DASHBOARD.ecommerce },
  { title: 'marketing', path: PATH_DASHBOARD.marketing },
  { title: 'social', path: PATH_DASHBOARD.social },
  { title: 'bidding', path: PATH_DASHBOARD.bidding },
  { title: 'learning', path: PATH_DASHBOARD.learning },
  { title: 'logistics', path: PATH_DASHBOARD.logistics },
];

const CORPORATE_ITEMS = [
  { title: 'about', path: PATH_CORPORATE.about },
  { title: 'team', path: PATH_CORPORATE.team },
  { title: 'faq', path: PATH_CORPORATE.faqs },
  { title: 'contact us', path: PATH_CORPORATE.contact },
  { title: 'pricing', path: PATH_CORPORATE.pricing },
  { title: 'license', path: PATH_CORPORATE.license },
];

const USER_PROFILE_ITEMS = [
  { title: 'details', path: PATH_USER_PROFILE.details },
  { title: 'preferences', path: PATH_USER_PROFILE.preferences },
  { title: 'information', path: PATH_USER_PROFILE.personalInformation },
  { title: 'security', path: PATH_USER_PROFILE.security },
  { title: 'activity', path: PATH_USER_PROFILE.activity },
  { title: 'actions', path: PATH_USER_PROFILE.action },
  { title: 'help', path: PATH_USER_PROFILE.help },
  { title: 'feedback', path: PATH_USER_PROFILE.feedback },
];

const AUTHENTICATION_ITEMS = [
  { title: 'sign in', path: PATH_AUTH.signin },
  { title: 'sign up', path: PATH_AUTH.signup },
  { title: 'welcome', path: PATH_AUTH.welcome },
  { title: 'verify email', path: PATH_AUTH.verifyEmail },
  { title: 'password reset', path: PATH_AUTH.passwordReset },
  { title: 'account deleted', path: PATH_AUTH.accountDelete },
];

const ERROR_ITEMS = [
  { title: '400', path: PATH_ERROR.error400 },
  { title: '403', path: PATH_ERROR.error403 },
  { title: '404', path: PATH_ERROR.error404 },
  { title: '500', path: PATH_ERROR.error500 },
  { title: '503', path: PATH_ERROR.error503 },
];

export {
  PATH_CALENDAR,
  PATH_USER_MGMT,
  PATH_INBOX,
  PATH_PROJECTS,
  PATH_LAYOUT,
  PATH_CORPORATE,
  PATH_CONTACTS,
  PATH_DASHBOARD,
  PATH_CHANGELOG,
  PATH_CAREERS,
  PATH_ACCOUNT,
  PATH_GITHUB,
  PATH_AUTH,
  PATH_INVOICE,
  PATH_BLOG,
  PATH_ERROR,
  PATH_DOCS,
  PATH_SUBSCRIPTION,
  PATH_USER_PROFILE,
  PATH_FILE,
  PATH_SOCIAL,
  PATH_START,
  PATH_LANDING,
  PATH_SITEMAP,
  DASHBOARD_ITEMS,
  CORPORATE_ITEMS,
  USER_PROFILE_ITEMS,
  PATH_SOCIALS,
  AUTHENTICATION_ITEMS,
  ERROR_ITEMS,
  PATH_ABOUT,
};

export * from './constant';