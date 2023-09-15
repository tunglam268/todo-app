const xlsToJson = require('xls-to-json');
const db = require('../database/connect');

const filePath = 'D:\\todo-app\\backend\\book1.xls'; // Điều chỉnh thành đúng đường dẫn tới tệp XLS của bạn

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
            ImporToDatabase(result)
        }
    }
);

function ImporToDatabase(dataExcel) {
    const citys = []
    const districts = []
    const wards = []

    let indexCity = 1
    let indexDistrict = 1

    for (const data of dataExcel) {
        const cityName = data['Tỉnh Thành Phố'];
        const cityCode = data['Mã TP'];

        const districtName = data['Quận Huyện'];
        const districtCode = data['Mã QH'];

        const wardName = data['Phường Xã'];
        const wardCode = data['Mã PX'];

        const isCityExist = citys.some(city =>city.cityName === cityName && city.cityCode ===  parseInt(cityCode));
        if (!isCityExist) {
            const cityObj = {
                cityName: cityName,
                cityCode: parseInt(cityCode)
            };

            citys.push(cityObj);
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
            const wardObj = {
                wardName: wardName,
                wardCode: parseInt(wardCode),
                districtID: indexDistrict
            };
            wards.push(wardObj);
        }
    }
    ImportCityToDatabase(citys,districts,wards)

}

function ImportWardToDatabase(values) {
    const query = `INSERT INTO wards (ward_name, ward_code,districtID) VALUES`
    const insertValues = []
    for (const ward of values) {
        const wardValue = `('${ward.wardName}',${ward.wardCode},${ward.districtID})`
        insertValues.push(wardValue)
    }
    db.query(query + insertValues.join(','), (err) => {
        if (err) {
            console.error('Lỗi khi thêm dữ liệu vào bảng city:', err);
        } else {
            console.log('Dữ liệu đã được thêm vào bảng city');
        }
    })
}

function ImportDistrictToDatabase(values) {
    const query = `INSERT INTO districts (district_name, district_code,cityID) VALUES`
    const insertValues = []
    for (const district of values) {
        const districtValue = `('${district.districtName}',${district.districtCode},${district.cityID})`
        insertValues.push(districtValue)
    }
    db.query(query + insertValues.join(','), (err) => {
        if (err) {
            console.error('Lỗi khi thêm dữ liệu vào bảng city:', err);
        } else {
            console.log('Dữ liệu đã được thêm vào bảng city');
        }
    })
}

function ImportCityToDatabase(values) {
    const query = `INSERT INTO cities (city_name, city_code) VALUES`
    const insertValues = []
    for (const city of values) {
        const cityValue = `('${city.cityName}',${city.cityCode})`
        insertValues.push(cityValue)
    }
    db.query(query + insertValues.join(','), (err) => {
        if (err) {
            console.error('Lỗi khi thêm dữ liệu vào bảng city:', err);
        } else {
            console.log('Dữ liệu đã được thêm vào bảng city');
        }
    })
    ImportDistrictToDatabase()
}