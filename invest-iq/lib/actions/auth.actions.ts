'use server';
import {auth} from "@/lib/better-auth/auth";
import { email } from "better-auth";
import {headers} from "next/headers";
export const signUpWithEmail = async ({ email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({ body: { email, password, name: fullName } })
        return { success: true, data: response }
    } catch (e) {
        console.log('Sign up failed', e)
        return { success: false, error: 'Sign up failed' }
    }
}

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({ body: { email, password } })

        return { success: true, data: response }
    } catch (e) {
        console.log('Sign in failed', e)
        return { success: false, error: 'Sign in failed' }
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({ headers: await headers() });
    } catch (e) {
        console.log('Sign out failed', e)
        return { success: false, error: 'Sign out failed' }
    }
}

export const deleteUserProfile = async ({  password }: {password: string}) => {
try {
        await auth.api.deleteUser({ body: {password}, headers: await headers()});
        return { success: true, message: 'User deleted successfully' }; // ADD THIS
    } catch (e) {
        console.log('Delete failed', e);
        return { success: false, error: 'Delete failed' }; // Also fixed typo
    }
};