const CLIENT_ROUTES = {
    home: '/',
    quiz: '/quiz',
}

const SOCIAL_LINKS = {
    facebook: 'https://www.facebook.com/manual.com',
    google: 'https://www.google.com',
    twitter: 'https://www.twitter.com',
}

const COMPANY_LINKS = {
    manual: 'https://www.manual.co',
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const API_ROUTES = {
    questionnaire: `${BASE_URL}/api/questionnaire`,
}

export const constants = {
    API_ROUTES,
    CLIENT_ROUTES,
    SOCIAL_LINKS,
    COMPANY_LINKS,
}