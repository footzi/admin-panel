import express from 'express';
const router = express.Router();

const json = {
    name: 'Vlad',
    female: 'Cat'
}

router.use('/api/test', (req, res) => {
    console.log(json)
    res.send(json)
})

export default router;