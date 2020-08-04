const Joi = require('joi');//for validation
const express = require('express');
const app = express(); //for making requests
app.use(express.json()); // for json


courses = [
    {
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    }
];
app.get('/', (req, res) => {
    res.send('hello hassan');
});
app.get('/hassan', (req, res) => {
    res.send([1, 2, 3]);
});
app.get('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('not found');
    res.send(course);
});
app.post('/courses', (req, res) => {
    const schema = Joi.object(
        {
            name: Joi.string().min(3).required()
        }
    );

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        console.log('error');
        return;
    }
    else {
        const course = {
            id: courses.length + 1,
            name: req.body.name,
        };
        courses.push(course);
        res.send(course);
        console.log('done');
    }
    // if(result.error){
    //     res.status(400).send(result.error);
    //     return;
    // }

});

app.put('/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('not found');
    const schema = Joi.object(
        {
            name: Joi.string().min(3).required()
        }
        
    );
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        console.log('error');
        return;
    }
    course.name=req.body.name;
    res.send(course);
});
const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`listening on port ${port}...`));