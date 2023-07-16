import express from 'express';
const app = express();
const port = process.env.PORT || 3001;

app.post("/test", (req: any, res: any) => res.type('application/json').send({success: true}));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
