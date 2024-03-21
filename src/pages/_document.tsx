import Document, { Head, Html, Main, NextScript } from 'next/document';

class DocumentOverride extends Document {
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale || this.props.__NEXT_DATA__.defaultLocale;

    return (
      <Html lang={currentLocale as string}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default DocumentOverride;
