/**
 * Функция для преобразования расходной характеристики
 * в такой формат, в котором её удобно отобразить на фронте
 */
function transformFlowChar(obj) {
   const x = [];
   const y = [];

   // Извлекаем координаты из массива start
   x.push(obj.start[0]);
   y.push(obj.start[1]);

   // Извлекаем координаты из массива points (если есть)
   if (obj.points && obj.points.length > 0) {
      obj.points.forEach((point) => {
         x.push(point[0]);
         y.push(point[1]);
      });
   }

   // Извлекаем координаты из массива end
   x.push(obj.end[0]);
   y.push(obj.end[1]);

   return { x, y };
}

module.exports = transformFlowChar;
