'use client';
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import SelectField from "@/components/forms/SelectField";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import FooterLink from "@/components/forms/FooterLink";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
const SignUp = () => {
    const router = useRouter(); 
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
        fullName: '',
        email: '',
        password: '',
        country: 'US',
        investmentGoals: '',
        riskTolerance: '',
        preferredIndustry: '',
        },
        mode: 'onBlur'
       
    });

    const onSubmit = async(data: SignUpFormData) => {
        try {
            //signupwithEmail
            const result = await signUpWithEmail(data); 

            if(result.success) router.push('/');  
            

        }
        catch (e){
            console.error(e);
            toast.error('Sign up failed',  {
                description: e instanceof Error ? e.message : 'Failed to create an account'
            })
        }
    }
    return (
        <div> 
            <Link href="/" className="auth-logo ">
                <Image src="/assets/icons/logo.svg" alt = "Invest-IQ Logo" width = {250} height = {50} className="h-10 ml-110" />
            </Link>
            <h1 className="form-title ml-95 mt-3"> Sign Up & Personalize </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 grid grid-cols-2 gap-x-50 ml-10">

            <InputField 
                name="fullName"
                label = "Full Name"
                placeholder = "John Doe"
                register={register}
                error={errors.fullName}
                validation={{required: 'Full name is required', minLength: 2}}
            />


               <InputField 
                name="email"
                label = "Email"
                placeholder = "contact@invest-iq.com"
                register={register}
                error={errors.email}
                validation={{required: 'Email is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required' }}
            />

               <InputField 
                name="password"
                label = "Password"
                placeholder = "Enter a strong password"
                type="password"
                register={register}
                error={errors.password}
                validation={{required: 'Full name is required', minLength: 8}}
            />

            {/**Country */}

        <SelectField
            name="investmentGoals"
            label="Investment Goals"
            placeholder="Select your investment goals"
            options={INVESTMENT_GOALS}
            control = {control}
            error = {errors.investmentGoals}
            required
            />

             <SelectField
            name="riskTolerance"
            label="Risk Tolerance"
            placeholder="Select your risk level"
            options={RISK_TOLERANCE_OPTIONS}
            control = {control}
            error = {errors.riskTolerance}
            required
            />

             <SelectField
            name="PreferredIndustry"
            label="Preferred Industry"
            placeholder="Select your preferred industry"
            options={PREFERRED_INDUSTRIES}
            control = {control}
            error = {errors.preferredIndustry}
            required
            />
          <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-3 w-80 ml-95">
                {isSubmitting ? 'Creating Account' : 'Start your investing Journey'}
            </Button>
        </form>
           
            <div className="ml-10">
                <FooterLink text="Already have an account?" linkText="Sign in" href="/sign-in" />
            </div>
         </div>
    )
}

export default SignUp;
