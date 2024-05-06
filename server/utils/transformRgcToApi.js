/**
 * Функция для преобразования ХОП в такой вид,
 * в котором с ним сможет работать API
 */
function transformRgcForApi(x, y) {
    let result = [];

    for (let i = 0; i < x.length - 1; i+=2) {
        let interval = [x[i], x[i+1]];
        let tangent = y[i+1];

        result.push({"interval": interval, "tangent": tangent});
    }

    return result;
}

module.exports = transformRgcForApi;


