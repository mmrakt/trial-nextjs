import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import React from 'react'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<any> {
    const styledComponentSheets = new StyledComponentSheets()
    const materialUiServerStyleSheets = new MaterialUiServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentSheets.collectStyles(
              materialUiServerStyleSheets.collect(<App {...props} />)
            ),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {styledComponentSheets.getStyleElement()}
            {materialUiServerStyleSheets.getStyleElement()}
          </>
        ),
      }
    } finally {
      styledComponentSheets.seal()
    }
  }

  render(): any {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
