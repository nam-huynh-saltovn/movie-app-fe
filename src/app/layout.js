import localFont from "next/font/local";
import "./globals.css";
import ToastProvider from "@/lib/toastify/ToastProvider";
import { StoreProvider } from "./StoreProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Trang chủ Phimvip - Xem phim chất lượng cao không quảng cáo - Cập nhật liên tục tại PhimVip.com",
  description: "PhimVip.com là trang xem phim chất lượng cao, không quảng cáo, cập nhật phim mới liên tục. Trải nghiệm giải trí hàng đầu với tốc độ nhanh và nội dung phong phú.",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/images/favicon.ico" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <ToastProvider>
              {children}
            </ToastProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
