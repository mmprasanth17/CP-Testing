/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6129032258064516, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "Department-1"], "isController": false}, {"data": [1.0, 500, 1500, "Department-2"], "isController": false}, {"data": [0.5, 500, 1500, "Fees-0"], "isController": false}, {"data": [0.5, 500, 1500, "Department-0"], "isController": false}, {"data": [1.0, 500, 1500, "Fees-1"], "isController": false}, {"data": [0.5, 500, 1500, "Faculty-0"], "isController": false}, {"data": [1.0, 500, 1500, "Faculty-1"], "isController": false}, {"data": [0.5, 500, 1500, "Alumni"], "isController": false}, {"data": [0.0, 500, 1500, "Department"], "isController": false}, {"data": [0.5, 500, 1500, "Quality-0"], "isController": false}, {"data": [1.0, 500, 1500, "Quality-1"], "isController": false}, {"data": [0.5, 500, 1500, "Quality"], "isController": false}, {"data": [0.5, 500, 1500, "Library-0"], "isController": false}, {"data": [1.0, 500, 1500, "Library-1"], "isController": false}, {"data": [0.5, 500, 1500, "Homepage-1"], "isController": false}, {"data": [0.5, 500, 1500, "Homepage-0"], "isController": false}, {"data": [0.5, 500, 1500, "Faculty"], "isController": false}, {"data": [0.0, 500, 1500, "Homepage"], "isController": false}, {"data": [1.0, 500, 1500, "Media-1"], "isController": false}, {"data": [1.0, 500, 1500, "Alumni-1"], "isController": false}, {"data": [1.0, 500, 1500, "Student-1"], "isController": false}, {"data": [0.5, 500, 1500, "Alumni-0"], "isController": false}, {"data": [0.5, 500, 1500, "Student-0"], "isController": false}, {"data": [0.5, 500, 1500, "Media"], "isController": false}, {"data": [0.5, 500, 1500, "Student"], "isController": false}, {"data": [0.5, 500, 1500, "Media-0"], "isController": false}, {"data": [0.5, 500, 1500, "Fees"], "isController": false}, {"data": [0.5, 500, 1500, "Programmes"], "isController": false}, {"data": [0.5, 500, 1500, "Programmes-0"], "isController": false}, {"data": [1.0, 500, 1500, "Programmes-1"], "isController": false}, {"data": [0.5, 500, 1500, "Library"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 31, 0, 0.0, 715.3225806451612, 47, 2090, 842.0, 1060.2, 1851.7999999999995, 2090.0, 2.7917867435158503, 325.8241329138149, 0.45521321145533145], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Department-1", 1, 0, 0.0, 773.0, 773, 773, 773.0, 773.0, 773.0, 773.0, 1.29366106080207, 0.47754285252263906, 0.1604442917205692], "isController": false}, {"data": ["Department-2", 1, 0, 0.0, 53.0, 53, 53, 53.0, 53.0, 53.0, 53.0, 18.867924528301884, 3305.571933962264, 2.2847877358490565], "isController": false}, {"data": ["Fees-0", 1, 0, 0.0, 842.0, 842, 842, 842.0, 842.0, 842.0, 842.0, 1.187648456057007, 0.3293868764845606, 0.14265699228028503], "isController": false}, {"data": ["Department-0", 1, 0, 0.0, 866.0, 866, 866, 866.0, 866.0, 866.0, 866.0, 1.1547344110854503, 0.429642393187067, 0.14321413106235567], "isController": false}, {"data": ["Fees-1", 1, 0, 0.0, 69.0, 69, 69, 69.0, 69.0, 69.0, 69.0, 14.492753623188406, 2326.4266304347825, 1.740828804347826], "isController": false}, {"data": ["Faculty-0", 1, 0, 0.0, 866.0, 866, 866, 866.0, 866.0, 866.0, 866.0, 1.1547344110854503, 0.32138604214780603, 0.13983112009237875], "isController": false}, {"data": ["Faculty-1", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 56.0, 17.857142857142858, 3837.5592912946427, 2.162388392857143], "isController": false}, {"data": ["Alumni", 1, 0, 0.0, 906.0, 906, 906, 906.0, 906.0, 906.0, 906.0, 1.1037527593818985, 184.5757019177704, 0.2608478200883002], "isController": false}, {"data": ["Department", 1, 0, 0.0, 1693.0, 1693, 1693, 1693.0, 1693.0, 1693.0, 1693.0, 0.5906674542232723, 103.9199784037212, 0.21803935321913762], "isController": false}, {"data": ["Quality-0", 1, 0, 0.0, 842.0, 842, 842, 842.0, 842.0, 842.0, 842.0, 1.187648456057007, 0.3375055671021378, 0.15077568289786225], "isController": false}, {"data": ["Quality-1", 1, 0, 0.0, 70.0, 70, 70, 70.0, 70.0, 70.0, 70.0, 14.285714285714285, 2440.457589285714, 1.8136160714285712], "isController": false}, {"data": ["Quality", 1, 0, 0.0, 912.0, 912, 912, 912.0, 912.0, 912.0, 912.0, 1.0964912280701753, 187.62742427357455, 0.27840597587719296], "isController": false}, {"data": ["Library-0", 1, 0, 0.0, 846.0, 846, 846, 846.0, 846.0, 846.0, 846.0, 1.1820330969267139, 0.3266751625295508, 0.14082816193853429], "isController": false}, {"data": ["Library-1", 1, 0, 0.0, 105.0, 105, 105, 105.0, 105.0, 105.0, 105.0, 9.523809523809526, 1833.8634672619048, 1.134672619047619], "isController": false}, {"data": ["Homepage-1", 1, 0, 0.0, 1072.0, 1072, 1072, 1072.0, 1072.0, 1072.0, 1072.0, 0.9328358208955224, 183.19474405317163, 0.10202891791044776], "isController": false}, {"data": ["Homepage-0", 1, 0, 0.0, 1013.0, 1013, 1013, 1013.0, 1013.0, 1013.0, 1013.0, 0.9871668311944718, 0.2641442497532083, 0.10797137216189537], "isController": false}, {"data": ["Faculty", 1, 0, 0.0, 922.0, 922, 922, 922.0, 922.0, 922.0, 922.0, 1.0845986984815619, 233.38572735900215, 0.26267624728850325], "isController": false}, {"data": ["Homepage", 1, 0, 0.0, 2090.0, 2090, 2090, 2090.0, 2090.0, 2090.0, 2090.0, 0.4784688995215311, 94.09203050239235, 0.10466507177033493], "isController": false}, {"data": ["Media-1", 1, 0, 0.0, 89.0, 89, 89, 89.0, 89.0, 89.0, 89.0, 11.235955056179774, 2203.245698735955, 1.3606039325842698], "isController": false}, {"data": ["Alumni-1", 1, 0, 0.0, 69.0, 69, 69, 69.0, 69.0, 69.0, 69.0, 14.492753623188406, 2419.568048007246, 1.7125226449275361], "isController": false}, {"data": ["Student-1", 1, 0, 0.0, 61.0, 61, 61, 61.0, 61.0, 61.0, 61.0, 16.393442622950822, 2766.633580942623, 1.9371157786885247], "isController": false}, {"data": ["Alumni-0", 1, 0, 0.0, 836.0, 836, 836, 836.0, 836.0, 836.0, 836.0, 1.1961722488038278, 0.32941462320574166, 0.14134457236842105], "isController": false}, {"data": ["Student-0", 1, 0, 0.0, 836.0, 836, 836, 836.0, 836.0, 836.0, 836.0, 1.1961722488038278, 0.32941462320574166, 0.14134457236842105], "isController": false}, {"data": ["Media", 1, 0, 0.0, 929.0, 929, 929, 929.0, 929.0, 929.0, 929.0, 1.0764262648008611, 211.37479817007534, 0.2606969860064585], "isController": false}, {"data": ["Student", 1, 0, 0.0, 897.0, 897, 897, 897.0, 897.0, 897.0, 897.0, 1.1148272017837235, 188.45043373745818, 0.263465022296544], "isController": false}, {"data": ["Media-0", 1, 0, 0.0, 839.0, 839, 839, 839.0, 839.0, 839.0, 839.0, 1.1918951132300357, 0.33172862038140644, 0.14433104886769965], "isController": false}, {"data": ["Fees", 1, 0, 0.0, 913.0, 913, 913, 913.0, 913.0, 913.0, 913.0, 1.095290251916758, 176.123528203724, 0.2631263691128149], "isController": false}, {"data": ["Programmes", 1, 0, 0.0, 880.0, 880, 880, 880.0, 880.0, 880.0, 880.0, 1.1363636363636362, 186.1627752130682, 0.2840909090909091], "isController": false}, {"data": ["Programmes-0", 1, 0, 0.0, 832.0, 832, 832, 832.0, 832.0, 832.0, 832.0, 1.201923076923077, 0.3392146183894231, 0.1502403846153846], "isController": false}, {"data": ["Programmes-1", 1, 0, 0.0, 47.0, 47, 47, 47.0, 47.0, 47.0, 47.0, 21.27659574468085, 3479.5960771276596, 2.6595744680851063], "isController": false}, {"data": ["Library", 1, 0, 0.0, 951.0, 951, 951, 951.0, 951.0, 951.0, 951.0, 1.0515247108307044, 202.76764589905363, 0.25055862250262884], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 31, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
