import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-6xl mx-auto px-8 py-10 grid md:grid-cols-4 gap-6">
                <div>
                    <Link href="/" className="inline-block mb-2">
                        <Image
                            src="/uantumalphaindia.png"
                            alt="Quantum Alpha India"
                            width={120}
                            height={72}
                            className="h-auto w-auto"
                        />
                    </Link>
                    <p className="text-sm mt-2">Smart trading platform powered by intelligence</p>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-2">Company</h4>
                    <ul className="space-y-1 text-sm">
                        <li><Link href="#" className="hover:text-white">About</Link></li>
                        <li><Link href="#" className="hover:text-white">Contact</Link></li>
                        <li><Link href="#" className="hover:text-white">Careers</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-2">Tools</h4>
                    <ul className="space-y-1 text-sm">
                        <li><Link href="#" className="hover:text-white">Trading</Link></li>
                        <li><Link href="#" className="hover:text-white">Analytics</Link></li>
                        <li><Link href="#" className="hover:text-white">Signals</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-2">Legal</h4>
                    <ul className="space-y-1 text-sm">
                        <li><Link href="#" className="hover:text-white">Privacy</Link></li>
                        <li><Link href="#" className="hover:text-white">Terms</Link></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-8 py-4 text-center text-xs border-t border-gray-800">
                © {new Date().getFullYear()} Quantum Alpha India. All rights reserved.
            </div>
        </footer>
    )
}
