"use-client";

import { Card, Metric, Title, Subtitle, BarChart, Text, Select, SelectItem, NumberInput, Flex, Grid, Col } from '@tremor/react';
import React, { useState, useEffect } from 'react';
import {fetchTinybirdUrl, topSalesDaysURL } from '../services/tinybird.js'

const TopSalesDays = ({host, token}) => {
    const [top_sales_days, setData] = useState([{
        "date": "",
        "total_sales": 0,
    }]);

    const [latency, setLatency] = useState(0);
    const [rows, setRows] = useState(0);
    const [limit, setLimit] = useState(10);
    const [utm_source, setUtmSource] = useState('instagram');

    const valueFormatter = (number) => `${new Intl.NumberFormat('us').format(number).toString()}`;

    let top_sales_day_url = topSalesDaysURL(host, token, utm_source, limit);

    useEffect(() => {
        fetchTinybirdUrl(top_sales_day_url, setData, setLatency, setRows)
    }, [top_sales_day_url]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchTinybirdUrl(top_sales_day_url, setData, setLatency, setRows)
        }, 1000);

        return () => clearInterval(interval);
    }, [top_sales_day_url]);

    return (
        <Grid numItems={6} className="gap-6 h-full">
            <Col numColSpan={6}>
                <Card>
                    <Flex>
                        <div className="card-title">
                            <Title>Top Days of Total Sales</Title>
                            <Subtitle>By UTM Source</Subtitle>
                        </div>
                        <div className="chart-input">
                            <Text>UTM Source</Text>
                            <Select
                                className="text-input"
                                defaultValue="instagram"
                                onValueChange={(value) => setUtmSource(value)}
                            >
                                <SelectItem value="instagram">Instagram</SelectItem>
                                <SelectItem value="newsletter">Newsletter</SelectItem>
                                <SelectItem value="tiktok">TikTok</SelectItem>
                                <SelectItem value="google">Google</SelectItem> 
                            </Select>
                        </div>
                        <div className="chart-input">
                            <Text># of Results</Text>
                            <NumberInput
                                className="number-input"
                                defaultValue="10"
                                onValueChange={(value) => setLimit(value)}
                            />
                        </div>
                    </Flex>
                    
                    <BarChart 
                        data={top_sales_days}
                        index="date"
                        categories={["total_sales"]} 
                        colors={["blue"]}
                        className="bar-chart"
                        valueFormatter={valueFormatter}
                        showAnimation="true"
                    />         
                </Card>
            </Col>
            <Card
                decoration="top" 
                decorationColor="blue"
            >
                <Text>Latency</Text>
                <Metric>{(latency*1000).toFixed(3)} ms</Metric>
            </Card>
            <Card
                decoration="top" 
                decorationColor="blue"
            >   
                <Text>Rows Read</Text>
                <Metric>{rows.toLocaleString()}</Metric>
            </Card>
        </Grid>
    );
};

export default TopSalesDays;