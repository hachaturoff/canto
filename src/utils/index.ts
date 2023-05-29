export const getEnv = (value: string | undefined, name: string) => {
    if (!value) {
        throw new Error(`${name} is undefined`)
    }

    return value
}