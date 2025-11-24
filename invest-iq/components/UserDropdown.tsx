
'use client';
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {LogOut} from "lucide-react";
import NavItems from "@/components/NavItems";
import {signOut, deleteUserProfile, updateUserProfile} from "@/lib/actions/auth.actions";


const UserDropdown = ({ user, initialStocks }: {user: User, initialStocks: StockWithWatchlistStatus[]}) => {
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false); 
    const [password, setPassword] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false); 
    const [updateData, setUpdateData] = useState({ name: user.name }); // Add this

    const handleSignOut = async () => {
        await signOut();
        router.push("/sign-in");
    }

    const handleDelete = async() => {
        setShowDeleteModal(true);

}
const handleConfirmDelete = async () => {
    if (!password) {
        alert('Please enter your password');
        return;
    }

    setIsDeleting(true);
    
    const result = await deleteUserProfile({ password });
    
    if (result?.success) {
        alert('Account deleted successfully');
        router.push('/');
    } else {
        alert(result?.error || 'Delete failed');
        setIsDeleting(false);
    }
};
const handleUpdate = async() => {
    setShowUpdateModal(true);
}

const handleConfirmUpdate = async () => {
    setIsUpdating(true);
    
    const result = await updateUserProfile(updateData);
    
    if (result?.success) {
        alert('Profile updated successfully');
        setShowUpdateModal(false);
        router.refresh(); // Refresh to show updated data
    } else {
        alert(result?.error || 'Update failed');
    }
    setIsUpdating(false);
};
    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 text-gray-4 hover:text-yellow-500">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/assets/images/profile.png" />
                        <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                            {user.name[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                        <span className='text-base font-medium text-gray-400'>
                            {user.name}
                        </span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-gray-400">
                <DropdownMenuLabel>
                    <div className="flex relative items-center gap-3 py-2">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="/assets/images/profile.png" />
                            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                                {user.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className='text-base font-medium text-gray-400'>
                                {user.name}
                            </span>
                            <span className="text-sm text-gray-500">{user.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-600"/>
                <DropdownMenuItem onClick={handleSignOut} className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
                    Logout
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-600"/>
                 <DropdownMenuItem onClick={handleUpdate} className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer">
                    Update
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-600"/>
                 <DropdownMenuItem onClick={handleDelete} className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer">
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator className="hidden sm:block bg-gray-600"/>
                {/* Delete Confirmation Modal */}
                
                <nav className="sm:hidden">
                    <NavItems initialStocks={initialStocks} />
                </nav>
            </DropdownMenuContent>
        </DropdownMenu>
        {showDeleteModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
                Delete Account
            </h3>
            <p className="text-gray-600 mb-4">
                This action cannot be undone. Please enter your password to confirm.
            </p>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-red-500"
            />
            <div className="flex gap-3">
                <button
                    onClick={handleConfirmDelete}
                    disabled={isDeleting}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
                >
                    {isDeleting ? 'Deleting...' : 'Delete Account'}
                </button>
                <button
                    onClick={() => {
                        setShowDeleteModal(false);
                        setPassword('');
                    }}
                    disabled={isDeleting}
                    className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
)}
{showUpdateModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
                Update Profile
            </h3>
            <input
                type="text"
                value={updateData.name}
                onChange={(e) => setUpdateData({...updateData, name: e.target.value})}
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-yellow-500"
            />
            <div className="flex gap-3">
                <button
                    onClick={handleConfirmUpdate}
                    disabled={isUpdating}
                    className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 disabled:bg-gray-400"
                >
                    {isUpdating ? 'Updating...' : 'Update Profile'}
                </button>
                <button
                    onClick={() => setShowUpdateModal(false)}
                    disabled={isUpdating}
                    className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
)}
</>
    )
}
export default UserDropdown
