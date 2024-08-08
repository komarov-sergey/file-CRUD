//@ts-nocheck
import fs from 'node:fs'
import { Router } from 'express'

import { ReportsService } from './report.repository'

export default Router().post('/fill_template', async ({ query, body }, res) => {
  await ReportsService.fillTemplate(query, body)

  const file = fs.createReadStream('./uploads/ruamds1_out.xlsx')
  const filename = new Date().toISOString()
  res.setHeader(
    'Content-Disposition',
    'attachment: filename="' + filename + '"'
  )

  return file.pipe(res)
})
