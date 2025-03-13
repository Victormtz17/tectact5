const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de cálculo');
});

app.get('/calculate', (req, res) => {
    const { num1, num2, op } = req.query;

    if (!num1 || !num2 || !op) {
        return res.status(400).json({ error: 'Faltan parámetros' });
    }

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ error: 'Los parámetros deben ser números' });
    }

    let result;
    switch (op) {
        case '+':
            result = n1 + n2;
            break;
        case '-':
            result = n1 - n2;
            break;
        case '*':
            result = n1 * n2;
            break;
        case '/':
            if (n2 === 0) return res.status(400).json({ error: 'No se puede dividir por cero' });
            result = n1 / n2;
            break;
        default:
            return res.status(400).json({ error: 'Operación no válida' });
    }

    res.json({ result });
});

app.listen(3001, () => {
    console.log("El servidor está corriendo en el puerto 3001");
});
