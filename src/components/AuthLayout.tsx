import type { ReactNode } from "react";

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="h-14 px-6 flex items-center bg-violet-300">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-purple-500 flex items-center justify-center text-white font-bold">
            💬
          </div>
          <span className="font-semibold text-lg text-gray-800">ShareChat</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row">
        <div className="md:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-6">
            {children}

            {footerText && footerActionText && onFooterAction && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mt-10">{footerText}</p>
                <button
                  onClick={onFooterAction}
                  className="mt-2 w-full py-2 rounded bg-purple-500 hover:bg-purple-600 text-white"
                >
                  {footerActionText}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 h-64 md:h-auto bg-[url('./src/assets/chat-girl.jpg')] bg-cover bg-center" />
      </main>
    </div>
  );
}
