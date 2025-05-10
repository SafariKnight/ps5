import express from 'express';
import controller from './controllers/data_controller';

const router = express.Router();
router.get('/getJsonFile', (req, res) => controller.readJsonFile(req, res));
router.post('/uploadJsonFile', (req, res) =>
  controller.uploadJsonFile(req, res)
);
export default router;
