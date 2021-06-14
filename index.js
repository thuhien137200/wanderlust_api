var fileSystem = require('fileSystem');
//ta gọi tới function createNewfile và truyền vào 1 file tên là text.txt
//để thuận tiện các bạn tạo 1 folder tên là data và tao 1 file text trong nó nhá
//dirName: nghĩa là thư mục bạn đang làm việc.
// ..: quay lại 1 folder (bởi vì mình đang ở folder src)
const fileName = _dirName + '/text.txt';
fileSystemt.createNewfile(fileName);
let jsonObject = {
    foods: [
        {
            foodName: "Cream Tea",
            foodDescription: "This is a cup of tea"
        },
        {
            foodName: "Japanese Salad",
            foodDescription: "Very delicious Janpanese Salad"
        },
        {
            foodName: "Cream Tea",
            foodDescription: "This is a cup of tea"
        },
        {
            foodName: "Korean Kimchi",
            foodDescription: "Traditional Korean Kimchi"
        },
        {
            foodName: "Fresh mushroom",
            foodDescription: "Fresh mushroom with vegatables"
        },
        {
            foodName: "Oysters",
            foodDescription: "Oysters with ice rock"
        },
    ],
    resultCode: 200,
    restaurantName: "Sasimi BBQ"
}
// fileSystem.saveJsonObjectToFile(jsonObject, fileName);
// fileSystem.readJsonObjectFromFile(fileName);

//nếu muốn khi thêm dữ liệu vào object
jsonObject.address = "13 floor KeangName, Abc, ...";
//sau đó là gọi
fileSystem.saveJsonObjectToFile(jsonObject, fileName);
fileSystem.readJsonObjectFromFile(fileName);
// và bên fileSystem.js các bạn cũng thử gọi thêm thuộc tính address nữa xem :)