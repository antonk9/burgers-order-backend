import Router from 'express';

const router = new Router()


router.get('/', function({res}) {
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(`
    <b>Available endpoints:</b>
    <nav>
    <li>categories</li>
    <li>products</li>
    </nav>
    `));
});

export default router;