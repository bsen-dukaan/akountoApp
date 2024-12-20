<template>
    <div class="py-4" :id="name"></div>

    
    
</template>

<script setup>

const props = defineProps({
    name: String,
    position: { type: String, default: 'bottom' } 
});

const { name, position } = props;

const getChartOptions = () => {
    return {
        series: [90, 85, 70],
        colors: ["#1C64F2", "#16BDCA", "#FDBA8C"],
        chart: {
            height: "300px",
            width: "100%",
            type: "radialBar",
            sparkline: {
                enabled: true,
            },
        },
        plotOptions: {
            radialBar: {
                track: {
                    background: '#E5E7EB',
                },
                dataLabels: {
                    show: false,
                },
                hollow: {
                    margin: 0,
                    size: "32%",
                }
            },
        },
        grid: {
            show: false,
            strokeDashArray: 4,
            padding: {
                left: 2,
                right: 2,
                top: -23,
                bottom: -20,
            },
        },
        labels: ["Invoices", "Recipts", "Total"],
        legend: {
            show: true,
            position: position,
            fontFamily: "Inter, sans-serif",
        },
        tooltip: {
            enabled: true,
            x: {
                show: false,
            },
        },
        yaxis: {
            show: false,
            labels: {
                formatter: function (value) {
                    return value + '%';
                }
            }
        }
    }
}

const chart = ref(null);

onMounted(() => {
    if (process.client) {
        console.log(name)
        if (document.getElementById(name) && typeof ApexCharts !== 'undefined') {
            chart.value = new ApexCharts(document.querySelector("#" + name), getChartOptions());
            chart.value.render();
        }
    }
})

onUnmounted(() => {
    if (chart.value) {
        chart.value.destroy();
    }
})

</script>