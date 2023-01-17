import express from 'express';

const router = express.Router();

// GET /user 라우터
router.get('/', (req, res) => {
    res.send('Hello, User');
});

//module.exports = router;
export default router;