'use client';

import { useState } from 'react';

export default function Home() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState(null);

  const calculate = async () => {
    
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    
    if (!num1 || !num2 || isNaN(number1) || isNaN(number2)) {
      alert('Por favor ingresa ambos números.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/calculate`,{
        method: "POST",
        headers:{
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({num1 : number1, 
          num2 : number2, 
           op: operation}),
        mode: 'cors'
      
      });

      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setResult(data.result);
      }
    } catch (error) {
      alert('Error al conectar con el servidor.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} placeholder="Número 1" />
      <select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} placeholder="Número 2" />
      <br /><br />
      <button onClick={calculate}>Calcular</button>
      {result !== null && <h2>Resultado: {result}</h2>}
    </div>
  );
}
