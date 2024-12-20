<template>
    <div id="chart" class="mt-2">
        
    </div>


</template>

<script setup>

import { onMounted } from 'vue';

import { defineProps } from 'vue';

const props = defineProps({
  dayWiseSuccessfulTxnTotal: Array,
  formatAmountInIndianCurrency: Function
});


onMounted(() => {


    if (process.client) {


        const chartCategories = props.dayWiseSuccessfulTxnTotal.map(entry => entry.day);
        const chartValues = props.dayWiseSuccessfulTxnTotal.map(entry => entry.totalAmount);

        var options = {
            
            chart: {
                height: 500,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    dataLabels: {
                        position: 'bottom', // top, center, bottom
                    },
                }

            },
            dataLabels: {
                enabled: false,
                formatter: function (val) {
                    return props.formatAmountInIndianCurrency(val);
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },

            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                position: 'top',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: function (val) {
                        return props.formatAmountInIndianCurrency(val);

                    }
                }

            },

            series: [{
                name: 'Successful Transactions',
                data: chartValues
            }],
            xaxis: {
                categories: chartCategories
            }
        }

        var chart = new ApexCharts(document.querySelector("#chart"), options);


        chart.render();


    }

});





</script>