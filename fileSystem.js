const fs = require('fs');
// ta tạo 1 file bằng cách sử dụng createNewfile, ở đây mình sử dụng arrow function
//openSync: sẽ mở file theo một tiến trình(sync) và sẽ mở file nên với quyền write;
module.exports = {
    createNewfile: (fileName) => {
        const fd = fs.openSync(fileName, 'w'); //fd là file description
    },
    saveJsonObjectToFile: (obj, fileName) => {
        // mình sử dụng stringify để biến object của chúng ta thành 1 string.
        const jsonString = JSON.stringify(obj)
        //tiếp theo ta gọi writeFile để ghi json ta vừa convert sang string vào fileName với dạng utf-8
        fs.writeFile(fileName, jsonString, 'utf-8', (err, data) => {
            if (err) throw err;
            console.log(`Saved to file ${fileName}`);
        });
    },
    readJsonObjectFromFile: (fileName) => {
        //Asynchrousy(đọc không đồng bộ)
        //bởi vì lệnh readFile của fs đọc không đồng bộ, đọc không đồng bộ là gì?
        //nghĩa là quá trình đọc file sẽ tách ra 1 tiến trình riêng, nên nếu ở dưới bạn có 1
        //câu lệnh khác mà data chưa đọc xong thì chương trình vẫn sẽ bỏ qua và chạy các dòng code ở dưới trước
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            //parse nghĩa là parse dữ liệu text của chúng ta từ dạng string quay về dạng object
            let jsonObject = JSON.parse(data);
            console.log(`jsonObject.object = ${JSON.stringify(jsonObject.foods)}`);
            console.log(`jsonObject.resultCode = ${JSON.stringify(jsonObject.resultCode)}`);
            console.log(`jsonObject.restaurantName = ${JSON.stringify(jsonObject.restaurantName)}`);
        })
    }
}