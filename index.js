const express = require('express');
const bodyParser = require('body-parser');
const predictor = require('asmu-service-mesh'); // Импорт модуля для предсказаний цен

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Маршрут для обработки запросов на предсказание цены
app.post('/predict', async (req, res) => {
  try {
    // Получение данных о продукте из запроса
    const productData = req.body;

    // Вызов функции предсказания цены из модуля asmu-service-mesh
    const predictedPrice = await predictor.predictPrice(productData);

    // Отправка предсказанной цены в ответе
    res.json({ predictedPrice });
  } catch (error) {
    console.error('Prediction failed:', error);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
