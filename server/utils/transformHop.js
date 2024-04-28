/**
 * Функция для преобразования ХОП в такой вид
 * в котором его будет удобно отобразить на фронте
 */
function transformHop(intervals) {
   const x = [];
   const y = [];

   intervals.forEach((intervalObj) => {
      const [start, end] = intervalObj.interval;

      // Добавляем начальную точку x и соответствующее значение y
      x.push(start);
      y.push(intervalObj.tangent);

      // Добавляем конечную точку x и соответствующее значение y
      x.push(end);
      y.push(intervalObj.tangent);
   });

   return { x, y };
}

module.exports = transformHop;
