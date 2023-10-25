const topSalesDaysURL = (host, token, utm_source, limit) =>
    `https://${host}/v0/pipes/sales_events_by_utm.json?limit=${limit}&utm_source=${utm_source}&token=${token}`

const fetchTinybirdUrl = async (fetchUrl, setData, setLatency, setRows) => {
    const data = await fetch(fetchUrl)
    const jsonData = await data.json();
    setData(jsonData.data);
    setLatency(jsonData.statistics.elapsed)
    setRows(jsonData.statistics.rows_read)
}

export {
    fetchTinybirdUrl,
    topSalesDaysURL
}