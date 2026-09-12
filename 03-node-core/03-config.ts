
const appName = process.env.APP_NAME ?? "Marketplace API";
console.log(`Application: ${appName}`);

const port = process.env.PORT ?? "3000";
console.log(`Port :  ${port}`);

const nodeEnv = process.env.NODE_ENV ?? "development";
console.log(`Environment :  ${nodeEnv}`);
