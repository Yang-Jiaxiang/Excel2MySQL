var mysql = require("mysql");
const XLSX = require("xlsx");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "recipe",
});

const parseExcel = (filename) => {
    const excelData = XLSX.readFile(filename);

    return Object.keys(excelData.Sheets).map((name) => ({
        name,
        data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
    }));
};

parseExcel("../ingredients.xlsx").forEach((element) => {
    InsertValues(element.data);
});

function InsertValues(value) {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        value.map((item) => {
            var sql = `INSERT INTO \`recipe\` (\`ID\`,\`iID\`, \`portion\`,\`dishID\`) VALUES (${item.ID},${item.IID},'${item.portion}',${item.dishID})`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        });
    });
}
