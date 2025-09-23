export const API_CONFIG = {
  BASE_URL: 'https://dummyjson.com',
  ENDPOINTS: {
    USERS: '/users',
    USERS_SEARCH: '/users/search',
    USER_BY_ID: '/users'
  }
} as const;


export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 5,
  LIMIT_OPTIONS: [5, 10, 20, 30],
  MAX_LIMIT: 100
} as const;


export const SEARCH_CONFIG = {
  DEBOUNCE_DELAY: 400,
  MIN_LENGTH: 2,
  MAX_LENGTH: 50
} as const;


export const VALIDATION_PATTERNS = {
  ALLOWED_SEARCH: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s\-\.]*$/,
  FORBIDDEN_PATTERNS: [
    /[<>]/,
    /[{}]/,
    /[\[\]]/,
    /[;:]/,
    /[|&]/
  ]
} as const;


export const ERROR_MESSAGES = {
  SEARCH: {
    MIN_LENGTH: `La búsqueda debe tener al menos ${SEARCH_CONFIG.MIN_LENGTH} caracteres`,
    MAX_LENGTH: `La búsqueda no puede exceder ${SEARCH_CONFIG.MAX_LENGTH} caracteres`,
    INVALID_CHARS: 'La búsqueda contiene caracteres no permitidos',
    ALLOWED_CHARS: 'Solo se permiten letras, números, espacios, guiones y puntos'
  },
  API: {
    FETCH_USERS: 'Error al cargar usuarios',
    FETCH_USER_DETAILS: 'No se pudieron cargar los detalles del usuario',
    CONNECTION: 'Hubo un problema al conectar con el servidor'
  }
} as const;


export const UI_TEXT = {
  LOADING: {
    USERS: 'Cargando usuarios...',
    SEARCH: 'Buscando...',
    DETAILS: 'Cargando detalles...'
  },
  PLACEHOLDERS: {
    SEARCH: 'Buscar usuarios por nombre...'
  },
  BUTTONS: {
    RETRY: 'Reintentar',
    CLOSE: 'Cerrar',
    CLEAR_SEARCH: 'Limpiar búsqueda',
    CLEAR_FILTERS: 'Limpiar filtros'
  },
  LABELS: {
    SHOWING: 'Mostrando',
    ELEMENTS_PER_PAGE: 'elementos por página',
    PAGES: 'páginas',
    OF: 'de',
    SEARCH_ACTIVE: 'Búsqueda:',
    FILTERED: '(filtrados)'
  }
} as const;


export const QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000,
  GC_TIME: 10 * 60 * 1000,
  RETRY_COUNT: 2,
  RETRY_DELAY_BASE: 1000,
  MAX_RETRY_DELAY: 30000
} as const;


export const MODAL_CONFIG = {
  MAX_HEIGHT: '90vh'
} as const;


export const GENDER_LABELS = {
  male: 'Masculino',
  female: 'Femenino'
} as const;


export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
} as const;


export const URL_PARAMS = {
  PAGE: 'page',
  LIMIT: 'limit',
  SEARCH: 'search'
} as const;