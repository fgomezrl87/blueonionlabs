import { Router } from 'express';
import { getClosest, getData, getStarlink, postData } from '../controllers/starlink';

const router = Router();

router.get('/', getData);
router.get('/:id', getStarlink);
router.post('/', postData);
router.put('/', getClosest);

export default router;