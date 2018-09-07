const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send({ 
		id: '123',
		username: 'JohnDoe',
		first_register: Date.now()
	})
})


app.listen(process.env.PORT | 3030, () => console.log('Listening on port 3030...'));