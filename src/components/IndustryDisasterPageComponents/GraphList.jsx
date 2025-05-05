import React, { useEffect, useState } from "react";
import { getGraphDataService } from "../../api/GraphService";
import Loading from "../LayoutComponents/Loading";
import Graph from "./Graph";

const GraphList = ({ selectedIndex }) => {
    const [graph, setGraph] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getAllGraphs = async () => {
            setIsLoading(true);
            const graphData = await getGraphDataService();
            setGraph(graphData);
            setIsLoading(false);
        };
        getAllGraphs();
    }, []);

    return (
        <div>
            {isLoading && <Loading />}
            {graph && graph[selectedIndex] && (
                <div
                    key={graph[selectedIndex].id}
                >
                    <Graph graph={graph[selectedIndex]} />
                </div>
            )}
        </div>
    );
};

export default GraphList;
