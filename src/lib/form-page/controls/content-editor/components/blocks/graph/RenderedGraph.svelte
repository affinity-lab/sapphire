<script>

    let {data, preview} = $props();


    // import { VisXYContainer, VisAxis, VisArea, VisBulletLegend } from '@unovis/svelte'
    // import { CurveType } from '@unovis/ts';

    let myData;
    $effect(()=> myData = reformatData(data) || {});

    let legend;
    $effect(legend = reformatLegend(data));

    function reformatLegend(data) {
        let d = [];
        data.lines.forEach((elem, index) => {
            d.push({
                name: elem.name,
                color: colorMap[index]
            })
        })
        return d;
    }

    let colorMap = ["red", "green", "yellow", "purple", "orange", "pink", "black", "magenta", "gray", "lime", "black"]

    let valid = false;
    function reformatData (data) {
        let d = [];
        if (data.headers.length > 1) {
            data.headers.forEach((elem, index) => {
                d.push({
                    name: elem,
                    points: data.lines.map((elem) => elem.points[index] || 0),
                    color: colorMap[index]
                })
            })
            valid = true;
            return d;
        } else {
            valid = false;
            return undefined;
        }
    }
</script>


<!--<div class="box is-flex is-flex-direction-column">-->
<!--    <h1 class="subtitle">{data.title}</h1>-->
<!--    <div class="chart p-0 m-0">-->
<!--        {#if valid}-->
<!--            <VisXYContainer data={myData} height={500}>-->
<!--                <VisBulletLegend items={legend}/>-->
<!--                {#each {length:myData.length} as _, i}-->
<!--                    <VisArea x={(d,i)=>i} y={(d)=>d.points[i]} color={colorMap[i]} opacity={0.5} curveType={CurveType.Linear}/>-->
<!--                {/each}-->
<!--                <VisAxis type='x' tickFormat={(i)=>myData[i]?.name || ''}/>-->
<!--                <VisAxis type='y' tickFormat={(i)=>i}/>-->
<!--            </VisXYContainer>-->
<!--        {/if}-->
<!--    </div>-->
<!--</div>-->


<style lang="scss">
</style>