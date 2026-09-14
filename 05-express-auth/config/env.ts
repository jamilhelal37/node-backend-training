const getRequiredEnv = (
    key: string
): string => {
    const value =
        process.env[key];

    if (!value) {
        throw new Error(
            `${key} is not configured`
        );
    }

    return value;
};

export const env = {
    port:
        Number(
            process.env.PORT
        ) || 3000,

    jwtSecret:
        getRequiredEnv(
            "JWT_SECRET"
        ),
};