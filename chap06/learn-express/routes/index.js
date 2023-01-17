import express from 'express';

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
    res.send('Hello, Express');
});

//module.exports = router;
export default router;