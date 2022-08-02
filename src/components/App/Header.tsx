import Link from "next/link";
import { MainRoutes } from "../../core/routing";

const Header = () => {
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
                <p>Sign In</p>
                <p className="border px-4 py-1 rounded-full border-blue-600">
                    Get Started
                </p>
            </div>
        </header>
    );
};

export default Header;
