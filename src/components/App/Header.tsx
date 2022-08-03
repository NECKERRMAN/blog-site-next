import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { MainRoutes } from "../../core/routing";

const Header = () => {
    const { data: session } = useSession();

    return (
        <header className="flex justify-between p-5 max-w-7xl mx-auto">
            <div className="flex items-center space-x-5">
                <Link href={MainRoutes.Index}>
                    <img
                        alt="logo"
                        src="https://www.seekpng.com/png/full/816-8163712_mountain-range-euclidean-vector-torres-del-paine-vector.png"
                        className="w-44 cursor-pointer object-contain grayscale hover:grayscale-0"
                    />
                </Link>
                <div className="hidden md:inline-flex items-center space-x-5">
                    <p>About</p>
                    <p>Contact</p>
                    <p className="text-white bg-blue-600 px-4 py-1 rounded-full">
                        Follow
                    </p>
                </div>
            </div>
            <div className="flex items-center space-x-5 text-blue-600">
                {!session ? (
                    <button
                        className="border px-4 py-1 rounded-full border-blue-600 hover:opacity-75"
                        onClick={() => signIn()}>
                        Sign in with Google
                    </button>
                ) : (
                    <>
                        <p>
                            Welcome,{" "}
                            <span className="underline">
                                {session.user.name}
                            </span>
                        </p>
                        <button
                            className="border px-4 py-1 rounded-full border-blue-600 hover:opacity-75"
                            onClick={() => signOut()}>
                            Sign out
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
