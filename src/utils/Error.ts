import { AuthError, CredentialsSignin } from "next-auth";

export class InvalidCredentials extends AuthError {
    public readonly kind = "signIn"

    constructor(message: string) {
        super("Invalid credentials")
        this.message = message
        this.type = "CredentialsSignin"
    }
}

export class CustomError extends CredentialsSignin {
    constructor(code: string) {
        super()
        this.code = code
        this.message = code
        this.stack = undefined
    }
}
