import { json } from 'body-parser';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const jsonDataFolder = path.join(process.cwd(), 'data');

class DataController {
    async readJsonFile(req: Request, res: Response): Promise<void> {
        const { fileName } = req.query;
        try {
            const filePath = path.join(jsonDataFolder, fileName as string);
            if (!fs.existsSync(filePath)) {
                res.status(404).json({ message: 'File not found' });
                return;
            }

            const fileContent = await fs.promises.readFile(filePath, 'utf-8');
            const jsonData = JSON.parse(fileContent);

            res.status(200).json(jsonData);
        } catch (error) {
            res.status(500).json({ message: 'Error reading JSON file', error: error.message });
        }
    }
    async uploadJsonFile(req: Request, res: Response): Promise<void> {
        try {
            const { fileName } = req.query;
            if (!fileName || typeof fileName !== 'string') {
                res.status(400).json({ message: 'File name is required and must be a string' });
                return;
            }
            const filePath = path.join(jsonDataFolder, fileName);
            const data = req.body;
            await fs.promises.writeFile(filePath, JSON.stringify(data), 'utf-8');

            res.status(201).json({ message: 'JSON file written successfully', filePath });
        } catch (error) {
            res.status(500).json({ message: 'Error writing JSON file', error: error.message });
        }
    }
}

export default new DataController();
