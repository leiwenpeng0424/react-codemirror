import { Token } from "./drawer";
export default class TokenCache {
    private tokens;
    get(key: string): Token;
    set(key: string, value: Token): void;
    clear(): void;
}
