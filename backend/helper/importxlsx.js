const xlsToJson = require('xls-to-json');
const db = require('../database/connect');

const filePath = '/home/lam/IdeaProjects/todo-app/backend/book1.xls'; // Điều chỉnh thành đúng đường dẫn tới tệp XLS của bạn

xlsToJson(
    {
        input: filePath,
    },
    (err, result) => {
        if (err) {
            console.error('Lỗi khi đọc tệp XLS:', err);
        } else {
            //   console.log('Dữ liệu từ tệp XLS:');
            //   console.log(result[0]['Tỉnh Thành Phố']);
            ImportToDatabase(result)
        }
    }
);

function ImportToDatabase(dataExcel) {
    const cities = []
    const districts = []
    const wards = []

    let indexCity = 0
    let indexDistrict = 0

    for (const data of dataExcel) {
        const cityName = data['Tỉnh Thành Phố'];
        const cityCode = data['Mã TP'];

        const districtName = data['Quận Huyện'];
        const districtCode = data['Mã QH'];

        const wardName = data['Phường Xã'];
        const wardCode = data['Mã PX'];

        const isCityExist = cities.some(city =>city.cityName === cityName && city.cityCode ===  parseInt(cityCode));
        if (!isCityExist) {
            const cityObj = {
                cityName: cityName,
                cityCode: parseInt(cityCode)
            };

            cities.push(cityObj);
            indexCity++;
        }

        const isDistrictExist = districts.some(district =>district.districtName === districtName && district.districtCode === parseInt(districtCode));
        if (!isDistrictExist) {
            const districtObj = {
                districtName: districtName,
                districtCode: parseInt(districtCode),
                cityID: indexCity
            };
            districts.push(districtObj);
            indexDistrict++
        }

        const isWardExist = wards.some(ward =>ward.wardName === wardName &&ward.wardCode === parseInt(wardCode));
        if (!isWardExist) {
            if (wardName !== ''){
                const wardObj = {
                    wardName: wardName,
                    wardCode: parseInt(wardCode),
                    districtID: indexDistrict
                };
                wards.push(wardObj);
            }
        }
    }
    ImportCityToDatabase(cities,districts,wards)

}

function ImportWardToDatabase(wards) {
    const batchSize = 1000;
    const query = `INSERT INTO wards (ward_name, ward_code,districtID) VALUES`
    let insertValues = []

    wards.forEach((ward , index) => {
        const wardValue = `('${ward.wardName}',${ward.wardCode},${ward.districtID})`
        insertValues.push(wardValue)

        if(insertValues.length === batchSize || index === wards.length - 1) {
            const insertQuery = query + insertValues.join(',');

            db.query(insertQuery, (err) => {
                if (err) {
                    console.error('Lỗi khi thêm dữ liệu vào bảng wards:', err);
                }
            });
            insertValues = [];
        }
    })
    console.log('Dữ liệu đã được thêm vào bảng wards');
}

function ImportDistrictToDatabase(districts, wards) {
    const batchSize = 100; // Số lượng phần tử mỗi lô
    const query = `INSERT INTO districts (district_name, district_code, cityID) VALUES`;
    let insertValues = [];

    districts.forEach((district, index) => {
        const districtValue = `('${district.districtName}', ${district.districtCode}, ${district.cityID})`;
        insertValues.push(districtValue);

        // Nếu số lượng phần tử trong lô đạt tới giới hạn hoặc đã xử lý hết dữ liệu
        if (insertValues.length === batchSize || index === districts.length - 1) {
            const insertQuery = query + insertValues.join(',');

            db.query(insertQuery, (err) => {
                if (err) {
                    console.error('Lỗi khi thêm dữ liệu vào bảng districts:', err);
                }
            });

            insertValues = []; // Đặt lại mảng insertValues cho lô tiếp theo
        }
    });

    // Sau khi hoàn thành xử lý districts, bạn có thể tiếp tục xử lý wards
    console.log('Dữ liệu đã được thêm vào bảng districts');
    ImportWardToDatabase(wards);
}


function ImportCityToDatabase(cities , districts , wards) {
    const query = `INSERT INTO cities (city_name, city_code) VALUES`
    const insertValues = []
    for (const city of cities) {
        const cityValue = `('${city.cityName}',${city.cityCode})`
        insertValues.push(cityValue)
    }
    db.query(query + insertValues.join(','), (err) => {
        if (err) {
            console.error('Lỗi khi thêm dữ liệu vào bảng city:', err);
        }
    })
    console.log('Dữ liệu đã được thêm vào bảng city');
    ImportDistrictToDatabase(districts,wards)
}