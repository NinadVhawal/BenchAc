const noOfPages = 4;
getData();

async function getData() {
    allTransactions = await getTransactions();
    buildTable(allTransactions);
}

async function getTransactions() {
    responseData = [];
    try {
        for (var i = 1; i <= noOfPages; i++) {
            var response = await fetch('https://resttest.bench.co/transactions/' + i + '.json');
            var data = await response.json();
            responseData = responseData.concat(data.transactions);
        }
    } catch (err){
        console.error(err);
    }
    return responseData;
}

function formatDate(date) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var date = new Date(date);
    var month = months[date.getMonth()];
    var year = date.getFullYear();
    var day = date.getDate();
    return month + ' ' + day + ',' + ' ' + year;
}

function buildTable(transactions) {
    var table = document.getElementById('myTable');
    var sum = 0;

    for (var i = 0; i < transactions.length; i++) {
        var row = `<tr>
							<td>${formatDate(transactions[i].Date)}</td>
							<td>${transactions[i].Company}</td>
							<td>${transactions[i].Ledger}</td>
                            <td>$${transactions[i].Amount}</td>
					  </tr>`
        table.innerHTML += row
        sum += Number(transactions[i].Amount);
    }
    document.getElementById('total').textContent = sum.toFixed(2);
}# BenchTest
