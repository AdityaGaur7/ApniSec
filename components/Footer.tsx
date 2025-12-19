export default function Footer() {
    return (
        <footer className="bg-surface border-t border-white/10 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold text-primary mb-4">ApniSec</h3>
                        <p className="text-gray-400 max-w-md">
                            Securing the digital frontier with advanced cybersecurity solutions.
                            Protecting your assets, data, and reputation.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Cloud Security</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">VAPT</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Red Teaming</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-500">
                    &copy; {new Date().getFullYear()} ApniSec. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
