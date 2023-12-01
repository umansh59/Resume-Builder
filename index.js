const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

let formSubmissions = [];

app.post('/form-submissions', (req, res) => {
    try {
        const formData = req.body;

        formSubmissions.push(formData);

        console.log('Form Submission Data:', formData);

        res.status(201).json({ success: true });
    } catch (error) {
        console.error('Error processing form submission:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getpost', (req, res) => {
    
  

    res.status(200).json(formSubmissions);
});

app.put('/form-submissions/:index', (req, res) => {
    const index = req.params.index;
    const updatedResumeData = req.body.resumeData;

    if (resumes[index]) {
        resumes[index] = updatedResumeData;
        res.status(200).json({ message: 'Resume updated successfully' });
    } else {
        res.status(404).json({ message: 'Resume not found' });
    }
});


app.delete('/form-submissions/:index', (req, res) => {
    const index = req.params.index;

    if (formSubmissions[index]) {
        formSubmissions.splice(index, 1);
        res.status(200).json({ message: 'Resume deleted successfully' });
    } else {
        res.status(404).json({ message: 'Resume not found' });
    }
});


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});