"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_sald_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt: {
        access_secret: process.env.JWT_ACCESS_SECRET,
        access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
        refress_secret: process.env.JWT_REFRESS_SECRET,
        refress_expires_in: process.env.JWT_REFRESS_EXPIRES_IN,
    },
};
