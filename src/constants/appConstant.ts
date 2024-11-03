export default {
  APP_NAME: '',

  // Pagination
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 30,
};

export enum Environment {
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
  TEST = 'TEST',
}

export enum UserLoginType {
  TRADITIONAL = 'TRADITIONAL', //register using email and password,
  GOOGLE = 'GOOOGLE',
}

export enum MediaType {
  PROFILE_IMAGE = 'PROFILE_IMAGE',
  PRODUCT_IMAGE = 'PRODUCT_IMAGE',
  CAROUSEL_IMAGE = 'CAROUSEL_IMAGE',
  STORE_LOGO = 'STORE_LOGO',
  BLOG_THUMBNAIL = 'BLOG_THUMBNAIL',
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUPER_ADMIN = 'SUPER_ADMIN',
  NONE = 'NONE',
}

export enum TokenEnum {
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum OrderStatus {
  INITIAL = 'INITIAL', //when order is created but payment is not done
  PENDING = 'PENDING', //when payment is done, and under the review of admin
  SHIPPED = 'SHIPPED', //shipped by merchant
  CANCELLED = 'CANCELLED', //cancelled by admin
  RECIVED = 'RECEIVED', // received by user
  CANCELLED_BY_USER = 'CANCELLED_BY_USER', //cancelled by user
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCEEDED = 'SUCCEEDED',
  BLOCKED = 'BLOCKED',
  CANCELED = 'CANCELED',
  REFUND = 'REFUND',
  FAILED = 'FAILED',
}

export enum STRIPE_PAYMENT_STATUS {
  CANCELED = 'payment_intent.canceled',
  CREATED = 'payment_intent.created',
  PARTIALLY_FUNDED = 'payment_intent.partially_funded',
  FAILED = 'payment_intent.payment_failed',
  REQUIRES_ACTION = 'payment_intent.requires_action',
  SUCCEEDED = 'payment_intent.succeeded',
}
