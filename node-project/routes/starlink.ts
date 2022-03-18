import { Router } from 'express';
import { getData, getStarlink, postData } from '../controllers/starlink';

const router = Router();

router.get('/', getData);
router.get('/:id', getStarlink);
router.post('/', postData);

export default router;