import { getEnv } from "../../utils";

export const explorerUrl = getEnv(process.env.REACT_APP_EXPLORER_URL, 'REACT_APP_EXPLORER_URL')