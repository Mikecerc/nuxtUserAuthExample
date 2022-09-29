export interface IPassword {
    salt: string;
    hash: string;
    iterations: number;
}