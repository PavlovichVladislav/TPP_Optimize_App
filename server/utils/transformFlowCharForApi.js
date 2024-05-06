/**
 * Функция для преобразования расходную харакетристику в такой вид,
 * в котором с ним сможет работать API
 */
function transformFlowCharForApi(data) {
    let shopFlowChar = {
        start: [data.x[0], data.x[1]],
        points: [],
        end: [data.y[0], data.y[1]]
    };

    if (data.x.length > 2) {
        for (let i = 1; i < data.x.length - 1; i++) {
            shopFlowChar.points.push([data.x[i], data.y[i]]);
        }
    }

    return shopFlowChar;
}

module.exports = transformFlowCharForApi;