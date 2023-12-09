import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  console.log("vikas")
  return (
    <Html className='flex flex-1 flex-col  bg-white min-h-max' lang="en">
      <Head />
      <body >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
