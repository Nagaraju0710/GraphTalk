// src/views/MyDashboard.js
import React, { useEffect, useState } from 'react';

import * as d3 from 'd3'; // Import D3.js library
import { getAllData } from './api';

const MyDashboard = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [endYearFilter, setEndYearFilter] = useState(null);
    const [topicsFilter, setTopicsFilter] = useState(null);
    const [filterintencity, setIntencity] = useState(null);
    const [filtersector, setSector] = useState(null);
    const [filterregion, setRegion] = useState(null);
    const [filterpestle, setPestle] = useState(null);
    const [filtersource, setSource] = useState(null);
    const [filtercountry, setCountry] = useState(null);
    const [filterinsight, setInsight] = useState(null);
    const [filterstartyear, setStartYear] = useState(null);
    const [filterimpact, setImpact] = useState(null);
    const [filteradded, setAdded] = useState(null);
    const [filterpublished, setPublished] = useState(null);
    const [filterrelevance, setRelevance] = useState(null);
    const [filtertitle, setTitle] = useState(null);
    const [filterlikelihood, setLikelihood] = useState(null);
    // Add more filters as needed

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllData();
                setData(result);
                setFilteredData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Apply filters whenever they change
        applyFilters();
    }, [endYearFilter, topicsFilter, filterintencity, filtersector, filterregion, filterpestle, filtersource, filtercountry, filterinsight, filterstartyear, filterimpact, filteradded, filterpublished, filterrelevance, filtertitle, filterlikelihood]); // Add more filters as dependencies

    const applyFilters = () => {
        let filtered = [...data];

        if (endYearFilter) {
            filtered = filtered.filter(item => item.year <= endYearFilter);
        }

        if (topicsFilter) {
            filtered = filtered.filter(item => item.topics <= topicsFilter);
        }
        if (filterintencity) {
            filtered = filtered.filter(item => item.intensity <= filterintencity);
        }
        if (filtersector) {
            filtered = filtered.filter(item => item.sector <= filtersector);
        }
        if (filterregion) {
            filtered = filtered.filter(item => item.region <= filterregion);
        }
        if (filterpestle) {
            filtered = filtered.filter(item => item.region <= filterpestle);
        }
        if (filtersource) {
            filtered = filtered.filter(item => item.source <= filtersource);
        }
        if (filtercountry) {
            filtered = filtered.filter(item => item.country <= filtercountry);
        }
        if (filterinsight) {
            filtered = filtered.filter(item => item.intensity <= filterinsight);
        }
        if (filterstartyear) {
            filtered = filtered.filter(item => item.start_year <= filterstartyear);
        }
        if (filterimpact) {
            filtered = filtered.filter(item => item.impact <= filterimpact);
        }
        if (filteradded) {
            filtered = filtered.filter(item => item.added <= filteradded);
        }
        if (filterpublished) {
            filtered = filtered.filter(item => item.published <= filterpublished);
        }
        if (filterrelevance) {
            filtered = filtered.filter(item => item.relevance <= filterrelevance);
        }
        if (filtertitle) {
            filtered = filtered.filter(item => item.title <= filtertitle);
        }
        if (filterlikelihood) {
            filtered = filtered.filter(item => item.likelihood <= filterlikelihood);
        }

        // Apply more filters as needed

        setFilteredData(filtered);
    };

    // Placeholder function for your D3.js visualization
    // Bar chart

    const renderIntensityBySectorChart = () => {
        const intensityBySector = d3.rollups(
            filteredData,
            v => d3.mean(v, d => d.intensity),
            d => d.sector
        );

        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3
            .select('#intensity-by-sector-chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand().domain(intensityBySector.map(d => d[0])).range([0, width]).padding(0.1);
        const y = d3.scaleLinear().domain([0, d3.max(intensityBySector, d => d[1])]).range([height, 0]);

        svg
            .selectAll('rect')
            .data(intensityBySector)
            .enter()
            .append('rect')
            .attr('x', d => x(d[0]))
            .attr('y', d => y(d[1]))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d[1]))
            .attr('fill', 'blue');

        svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
        svg.append('g').call(d3.axisLeft(y));

        svg.append('text')
            .attr('transform', `translate(${width / 2}, ${height + margin.top + 20})`)
            .style('text-anchor', 'middle')
            .text('Sector');

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left)
            .attr('x', 0 - height / 2)
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Average Intensity');
    };

    const renderRelevanceByRegionChart = () => {
        const relevanceByRegion = d3.rollups(
            filteredData,
            v => d3.mean(v, d => d.relevance),
            d => d.region
        );

        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3
            .select('#relevance-by-region-chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand().domain(relevanceByRegion.map(d => d[0])).range([0, width]).padding(0.1);
        const y = d3.scaleLinear().domain([0, d3.max(relevanceByRegion, d => d[1])]).range([height, 0]);

        svg
            .selectAll('rect')
            .data(relevanceByRegion)
            .enter()
            .append('rect')
            .attr('x', d => x(d[0]))
            .attr('y', d => y(d[1]))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d[1]))
            .attr('fill', 'green');

        svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
        svg.append('g').call(d3.axisLeft(y));

        svg.append('text')
            .attr('transform', `translate(${width / 2}, ${height + margin.top + 20})`)
            .style('text-anchor', 'middle')
            .text('Region');

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left)
            .attr('x', 0 - height / 2)
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Average Relevance');
    };

    //   pie chart

    const renderLikelihoodDistributionChart = () => {
        const likelihoodDistribution = d3.rollups(
            filteredData,
            v => v.length,
            d => d.likelihood
        );

        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        const svg = d3
            .select('#likelihood-distribution-chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie().value(d => d[1]);
        const dataPie = pie(likelihoodDistribution);

        const arc = d3.arc().innerRadius(0).outerRadius(radius);

        svg
            .selectAll('path')
            .data(dataPie)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => colorScale(i))
            .attr('stroke', 'white')
            .style('stroke-width', '2px');

        // Legend
        const legend = svg
            .selectAll('.legend')
            .data(dataPie)
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', (d, i) => `translate(0,${i * 20})`);

        legend
            .append('rect')
            .attr('x', 20)
            .attr('width', 18)
            .attr('height', 18)
            .style('fill', (d, i) => colorScale(i));

        legend
            .append('text')
            .attr('x', 40)
            .attr('y', 9)
            .attr('dy', '.35em')
            .style('text-anchor', 'start')
            .text(d => d.data[0]);
    };

    // Band  Chart


    const renderTopicBandChart = () => {
        const topicData = d3.rollups(
            filteredData,
            v => ({
                intensities: v.map(d => d.intensity),
                averageIntensity: d3.mean(v, d => d.intensity),
            }),
            d => d.topic
        );

        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3
            .select('#topic-band-chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand().domain(topicData.map(d => d[0])).range([0, width]).padding(0.1);
        const y = d3.scaleLinear().domain([0, d3.max(topicData, d => d[1].averageIntensity)]).range([height, 0]);

        // Draw bands
        svg
            .selectAll('rect')
            .data(topicData)
            .enter()
            .append('rect')
            .attr('x', d => x(d[0]))
            .attr('y', d => y(d[1].averageIntensity))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d[1].averageIntensity)) // Corrected this line
            .attr('fill', 'lightblue')
            .attr('stroke', 'blue');

        // Draw average lines
        svg
            .selectAll('line')
            .data(topicData)
            .enter()
            .append('line')
            .attr('x1', d => x(d[0]) + x.bandwidth() / 2)
            .attr('y1', d => y(d[1].averageIntensity))
            .attr('x2', d => x(d[0]) + x.bandwidth() / 2)
            .attr('y2', height)
            .attr('stroke', 'blue');

        // Add axis and labels
        svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
        svg.append('g').call(d3.axisLeft(y));

        svg.append('text')
            .attr('transform', `translate(${width / 2}, ${height + margin.top + 20})`)
            .style('text-anchor', 'middle')
            .text('Topic');

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left)
            .attr('x', 0 - height / 2)
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Intensity Range');
    };

    //   Donut chart

    const renderPestleDistributionDonutChart = () => {
        const pestleDistribution = d3.rollups(
            filteredData,
            v => v.length,
            d => d.pestle
        );

        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        const svg = d3
            .select('#pestle-distribution-donut-chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie().value(d => d[1]);
        const dataPie = pie(pestleDistribution);

        const arc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius);

        svg
            .selectAll('path')
            .data(dataPie)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => colorScale(i))
            .attr('stroke', 'white')
            .style('stroke-width', '2px');

        // Inner circle to create a donut chart
        svg.append('circle').attr('cx', 0).attr('cy', 0).attr('r', radius * 0.6).attr('fill', 'white');

        // Legend
        const legend = svg
            .selectAll('.legend')
            .data(dataPie)
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', (d, i) => `translate(0,${(i - dataPie.length / 2) * 20})`); // Adjusted the legend position

        legend
            .append('rect')
            .attr('x', 20)
            .attr('width', 18)
            .attr('height', 18)
            .style('fill', (d, i) => colorScale(i));

        legend
            .append('text')
            .attr('x', 40)
            .attr('y', 9)
            .attr('dy', '.35em')
            .style('text-anchor', 'start')
            .text(d => d.data[0]);
    };

    // Marimekko Chart

    const renderMarimekkoChart = () => {
        const countryData = d3.rollups(
            filteredData,
            v => ({
                totalIntensity: d3.sum(v, d => d.intensity),
            }),
            d => d.country
        );

        const totalIntensity = d3.sum(countryData, d => d[1].totalIntensity);

        const margin = { top: 20, right: 30, bottom: 50, left: 40 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3
            .select('#marimekko-chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear().domain([0, 1]).range([0, width]);
        const y = d3.scaleLinear().domain([0, totalIntensity]).range([height, 0]);

        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        // Draw rectangles
        svg
            .selectAll('rect')
            .data(countryData)
            .enter()
            .append('rect')
            .attr('x', d => x(0))
            .attr('y', d => y(d3.sum(countryData.filter(c => c[0] !== d[0]), c => c[1].totalIntensity)))
            .attr('width', d => x(d[1].totalIntensity / totalIntensity))
            .attr('height', d => height - y(d3.sum(countryData.filter(c => c[0] !== d[0]), c => c[1].totalIntensity)))
            .attr('fill', d => colorScale(d[0]));

        // Add axis and labels
        svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x).ticks(5).tickFormat(d3.format('.0%')));
        svg.append('g').call(d3.axisLeft(y));

        // Add axis labels
        svg.append('text')
            .attr('transform', `translate(${width / 2}, ${height + margin.top + 30})`)
            .style('text-anchor', 'middle')
            .text('Proportion of Total Country');

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left)
            .attr('x', 0 - height / 2)
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Total Country');
    };







    return (
        <div >
            <div style={{ display: "grid", justifyContent: "space-evenly", gridTemplateColumns: "1fr 1fr 1fr", marginTop: "50px" ,boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px",width:"80%",marginLeft:"100px",height:"500px",paddingTop:"50px",backgroundColor:"white",borderRadius:"30px"}}>

                {/* Filters */}
                <div>
                    <label style={{ color: "darkorange" }}>End Year:  </label>
                    <input style={{ border: "2px solid black", borderRadius: "10px" }}
                        type="number"
                        value={endYearFilter || ''}
                        onChange={e => setEndYearFilter(parseInt(e.target.value) || null)}
                    />
                </div>
                <div>
                    <label style={{ color: "darkorange" }}>Topics: </label>
                    <input style={{ border: "2px solid black", borderRadius: "10px" }}
                        type="text"
                        value={topicsFilter || ''}
                        onChange={e => setTopicsFilter(e.target.value || null)}
                    />
                </div>
                <div>
                    <label style={{ color: "darkorange" }}>Intensity: </label>
                    <input
                        type="number" style={{ border: "2px solid black", borderRadius: "10px" }}
                        value={filterintencity || ''}
                        onChange={e => setIntencity(parseInt(e.target.value) || null)}
                    />
                </div>
                <div style={{ paddingLeft: "18px", }}>
                    <label style={{ color: "darkorange" }}>Sector: </label>
                    <input
                        type="text" style={{ border: "2px solid black", marginTop: "20px", borderRadius: "10px" }}
                        value={filtersector || ''}
                        onChange={e => setSector(e.target.value) || null}
                    />
                </div>
                <div>
                    <label style={{ color: "darkorange" }}>Region:  </label>
                    <input
                        type="text" style={{ border: "2px solid black", marginTop: "20px", borderRadius: "10px" }}
                        value={filterregion || ''}
                        onChange={e => setRegion(e.target.value) || null}
                    />
                </div>

                <div style={{ paddingLeft: "18px", }}>
                    <label style={{ color: "darkorange" }}>Pestle:  </label>
                    <input
                        type="text" style={{ border: "2px solid black", marginTop: "20px", borderRadius: "10px" }}
                        value={filterpestle || ''}
                        onChange={e => setPestle(e.target.value) || null}
                    />
                </div>
                <div style={{ paddingLeft: "18px", }}>
                    <label style={{ color: "darkorange" }}>Source:  </label>
                    <input
                        type="text" style={{ border: "2px solid black", marginTop: "20px", borderRadius: "10px" }}
                        value={filtersource || ''}
                        onChange={e => setSource(e.target.value) || null}
                    />
                </div>
                <div>
                    <label style={{ color: "darkorange" }}>Country:  </label>
                    <input
                        type="text" style={{ border: "2px solid black", marginTop: "20px", borderRadius: "10px" }}
                        value={filtercountry || ''}
                        onChange={e => setCountry(e.target.value) || null}
                    />
                </div>
                <div style={{ paddingLeft: "18px", }}>
                    <label style={{ color: "darkorange" }}>Insight:  </label>
                    <input
                        type="text" style={{ border: "2px solid black", marginTop: "20px", borderRadius: "10px" }}
                        value={filterinsight || ''}
                        onChange={e => setInsight(e.target.value) || null}
                    />
                </div>
                <div>
                    <label style={{ color: "darkorange" }}>Start Year:  </label>
                    <input
                        type="number" style={{ border: "2px solid black", marginTop: "20px", borderRadius: "10px" }}
                        value={filterstartyear || ''}
                        onChange={e => setStartYear(parseInt(e.target.value) || null)}
                    />
                </div>
                <div>
                    <label style={{ color: "darkorange" }}>Imapct:  </label>
                    <input
                        type="text" style={{ border: "2px solid black", marginTop: "20px", borderRadius: "10px" }}
                        value={filterimpact || ''}
                        onChange={e => setImpact(e.target.value) || null}
                    />
                </div>
                <div style={{ paddingLeft: "18px", }}>
                    <label style={{ color: "darkorange" }}>Added:  </label>
                    <input
                        type="text" style={{ border: "2px solid black", marginTop: "20px", borderRadius: "10px" }}
                        value={filteradded || ''}
                        onChange={e => setAdded(e.target.value) || null}
                    />
                </div>
                <div>
                    <label style={{ color: "darkorange" }}>Published:  </label>
                    <input
                        type="text" style={{ border: "2px solid black", marginTop: "20px", borderRadius: "10px" }}
                        value={filterpublished || ''}
                        onChange={e => setPublished(e.target.value) || null}
                    />
                </div>
                <div style={{ paddingRight: "18px", }}>
                    <label style={{ color: "darkorange" }}>Relevance:  </label>
                    <input
                        type="text" style={{ border: "2px solid black", marginTop: "20px", borderRadius: "10px" }}
                        value={filterrelevance || ''}
                        onChange={e => setRelevance(parseInt(e.target.value) || null)}
                    />
                </div>
                <div style={{ paddingLeft: "35px", }}>
                    <label style={{ color: "darkorange" }}>Title:  </label>
                    <input
                        type="text" style={{ border: "2px solid black", marginTop: "20px", borderRadius: "10px" }}
                        value={filtertitle || ''}
                        onChange={e => setTitle(e.target.value) || null}
                    />
                </div>
                <div>
                    <label style={{ color: "darkorange" }}>Likelihood:  </label>
                    <input
                        type="number" style={{ border: "2px solid black", marginTop: "20px", borderRadius: "10px" }}
                        value={filterlikelihood || ''}
                        onChange={e => setLikelihood(e.target.value) || null}
                    />
                </div>
            </div>
            {/* Example: Display filtered data */}
            <div style={{ marginTop: "50px", color: "darkturquoise",width:"90%",paddingLeft:"150px" }}>
                <h2 style={{ fontFamily: "monospace", fontSize: "40px" }}>Filtered Data:</h2>
                <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto", marginTop: "50px" }}>
                    {filteredData.map(item => (
                        <div style={{ border: "5px solid navajowhite", fontFamily: "sans-serif", color: "darkviolet" }} key={item._id}>
                            {item.year}  {item.country}  {item.topics} {item.intensity} {item.sector} {item.region} {item.pestle} {item.country} {item.insight} {item.start_year} {item.impact} {item.added} {item.published} {item.relevance} {item.title} {item.likelihood}
                        </div>
                    ))}
                </div>
            </div>

            {/* Render your D3.js visualization */}
            {/* <div style={{ display: "grid", justifyContent: "space-evenly", gridTemplateColumns: "1fr 1fr" }} id="chart-container">{renderVisualization()}</div> */}
            <div style={{ display: "grid", justifyContent: "space-evenly", gridTemplateColumns: "1fr 1fr",gap:"20px",width:"90%",paddingLeft:"150px"  }} >
                <div  id="intensity-by-sector-chart">{renderIntensityBySectorChart()}</div>
                <div id="likelihood-distribution-chart">{renderLikelihoodDistributionChart()}</div>
                <div id="pestle-distribution-donut-chart">{renderPestleDistributionDonutChart()}</div>
                <div id="topic-band-chart">{renderTopicBandChart()}</div>
                <div id="marimekko-chart">{renderMarimekkoChart()}</div>

                <div id="relevance-by-region-chart">{renderRelevanceByRegionChart()}</div>

            </div>

        </div>
    );
};

export default MyDashboard;
