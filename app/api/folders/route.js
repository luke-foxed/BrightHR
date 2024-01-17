import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  try {
    const filePath = `${process.cwd()}/app/api/folders/mock_data.json`
    const fileContents = await fs.readFile(filePath, 'utf8')
    const cleanedFileContents = JSON.parse(fileContents)
    return NextResponse.json({ folders: cleanedFileContents }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ msg: 'Error retrieving folders', error }, { status: 500 })
  }
}
