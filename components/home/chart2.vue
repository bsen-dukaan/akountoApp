<template>
    <div id="chart2" class="mt-2">

    </div>


</template>

<script setup>

import { onMounted } from 'vue';

onMounted(() => {


    if (process.client) {

        var options = {
            series: [44, 55, 13, 43, 22],
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };

        var chart = new ApexCharts(document.querySelector("#chart2"), options);
        chart.render();



    }

});





</script>