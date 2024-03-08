export default (): Config => ({
  app: {
    port: parseInt(process.env.APP_PORT),
    auth: {
      accessToken: {
        expiresIn: process.env.APP_ACCESS_TOKEN_EXP,
        secret: process.env.APP_ACCESS_TOKEN_SECRET,
      },
      refreshToken: {
        expiresIn: process.env.APP_REFRESH_TOKEN_EXP,
        secret: process.env.APP_REFRESH_TOKEN_SECRET,
      },
    },
  },
  db: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
});

export interface AppAuthTokenConfig {
  expiresIn: string;
  secret: string;
}

export interface AppAuthConfig {
  accessToken: AppAuthTokenConfig;
  refreshToken: AppAuthTokenConfig;
}

export interface AppConfig {
  port: number;
  auth: AppAuthConfig;
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
