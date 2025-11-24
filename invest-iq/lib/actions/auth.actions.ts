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

export const updateUserProfile = async (data: {
    name?: string;
}) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers() // Import headers from 'next/headers'
        });

        if (!session) {
            return {
                success: false,
                error: 'Not authenticated'
            };
        }

        const result = await auth.api.updateUser({
            body: data,
            headers: await headers() // Pass the headers with session
        });

        return {
            success: true,
            data: result,
            message: 'Profile updated successfully'
        };
    } catch (e) {
        console.error('Error updating user profile:', e);
        return {
            success: false,
            error: e instanceof Error ? e.message : 'An unexpected error occurred'
        };
    }
};