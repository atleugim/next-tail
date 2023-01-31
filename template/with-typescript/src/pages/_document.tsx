import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={`${process.env.dev ? "debug-screens" : ""}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
