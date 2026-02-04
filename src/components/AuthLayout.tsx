import type { ReactNode } from "react";
import chatGirlImage from "../assets/chat-girl.jpg";

type AuthLayoutProps = {
  children: ReactNode;
  footerText?: string;
  footerActionText?: string;
  onFooterAction?: () => void;
};

export default function AuthLayout({
  children,
  footerText,
  footerActionText,
  onFooterAction,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
      <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="h-full px-6 flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
              💬
            </div>
            <span className="font-semibold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ShareChat
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex pt-16">
        <div className="w-full grid md:grid-cols-2">
          {/* Left side - Form */}
          <div className="w-full flex items-center justify-center p-6 md:p-12 order-2 md:order-1">
            <div className="w-full max-w-md space-y-6">
              {children}

              {footerText && footerActionText && onFooterAction && (
                <div className="text-center pt-6">
                  <p className="text-sm text-gray-600 mb-4">{footerText}</p>
                  <button
                    onClick={onFooterAction}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-colors duration-300 shadow-lg"
                  >
                    {footerActionText}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="hidden md:block order-1 md:order-2 w-full h-full">
            <img
              src={chatGirlImage}
              alt="Chat illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
