import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
const Layout = async ({children} : {children: React.ReactNode}) => {
    const session = await auth.api.getSession({headers: await headers()})

    if(session?.user) redirect('/'); 
    return (
            <div className="">
                {children}
            </div>
    )
}
export default Layout;