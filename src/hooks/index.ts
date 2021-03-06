import { printNpmReadme } from '../common/npm'

export = (Utils) => {
  return {
    hook_repl_command: new Utils.Hook('semo', () => {
      return {
        npm: {
          help: 'Get package information from npmjs.com ',
          async action(input) {
            if (!input) {
              Utils.warn('keyword is required')
            } else {
              // @ts-ignore
              this.clearBufferedCommand()
              
              await printNpmReadme(input)

               // @ts-ignore
              this.displayPrompt()
            }
          }

        }
      }
    })
  }
}