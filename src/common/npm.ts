import { Utils } from '@semo/core'
import got from 'got'
import cheerio from 'cheerio'

import TurndownService from 'turndown'
import { tables } from 'turndown-plugin-gfm'
import marked from 'marked'
import TerminalRenderer from 'marked-terminal'
marked.setOptions({
  renderer: new TerminalRenderer()
})

export const printNpmReadme = async (input) => {
  const url = `https://www.npmjs.com/package/${input}`
  const response = await got(url)
  console.log()
  const $ = cheerio.load(response.body)
  const body = $('body article').html()

  const turndownService = new TurndownService()
  turndownService.use(tables)
  if (body) {
    let converted = turndownService.turndown(body)
    converted = converted.replace(/\[\]\(\#.*?\)/g, '')
    Utils.consoleReader(marked(converted), {
      identifier: input,
      plugin: 'semo-plugin-repl-npm'
    })
  } else {
    console.log('Not found!')
  }
  return
}