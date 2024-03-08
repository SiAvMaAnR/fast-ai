export default (): Config => ({
  app: {
    port: parseInt(process.env.APP_PORT),
    mail: {
      host: process.env.MAIL_HOST,
      user: process.env.MAIL_USER,
      password: process.env.MAIL_PASSWORD,
      from: process.env.MAIL_FROM,
      port: parseInt(process.env.MAIL_PORT),
    },
  },
  db: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
});

export interface MailConfig {
  host: string;
  user: string;
  password: string;
  from: string;
  port: number;
}

export interface AppConfig {
  port: number;
  mail: MailConfig;
}

export interface DbConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

export interface Config {
  app: AppConfig;
  db: DbConfig;
}
