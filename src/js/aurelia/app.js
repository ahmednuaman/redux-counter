import 'babel-polyfill'

import { useView } from 'aurelia-framework'

@useView('./app.html')
export default async (aurelia) => {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()

  await aurelia.start()
  aurelia.setRoot('app')
}
