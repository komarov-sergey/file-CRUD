//@ts-nocheck
import fs from 'node:fs'
const XlsxPopulate = require('xlsx-populate')
const XlsxDataFill = require('xlsx-datafill')

const XlsxPopulateAccess = XlsxDataFill.XlsxPopulateAccess

export class ReportsService {
  public static async fillTemplate({ file_name, type }, body) {
    const preparedData = this.prepareData(body)
    const workbook = await this.processData(
      preparedData,
      './uploads/ruamds1.xlsx'
    )

    return await this.wrileToFile(workbook)
  }

  private static async processData(data, path) {
    const wb = await XlsxPopulate.fromFileAsync(path)
    const xlsxAccess = new XlsxPopulateAccess(wb, XlsxPopulate)
    const dataFill = new XlsxDataFill(xlsxAccess)
    dataFill.fillData(data)

    return xlsxAccess
  }

  private static prepareData({ filters, vertical }) {
    return {
      tableName: 'Название таблицы',
      filters,
      vertical,
    }
  }

  private static async wrileToFile(workbook) {
    return workbook.workbook().toFileAsync('./uploads/ruamds1_out.xlsx')
  }
}
