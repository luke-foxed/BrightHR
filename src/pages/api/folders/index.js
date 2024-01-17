import { promises as fs } from 'fs'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const filePath = `${process.cwd()}/src/pages/api/folders/mock_data.json`
      const fileContents = await fs.readFile(filePath, 'utf8')
      const cleanedFileContents = JSON.parse(fileContents)
      res.status(200).json({ folders: cleanedFileContents })
    } catch (error) {
      res.status(200).json({ msg: 'Error retrieving folders', error })
    }
  }
}
