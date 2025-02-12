/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

export const RadarChart = ({
  graphSize,
  scaleCount,
  numberInterval,
  data,
  options,
}) => {
  const boxSize = graphSize * 3;
  const centerPos = boxSize / 2;

  const posX = (angle, distance) =>
    Math.cos(angle - Math.PI / 2) * distance * graphSize;
  const posY = (angle, distance) =>
    Math.sin(angle - Math.PI / 2) * distance * graphSize;

  const initPath = (points) => {
    let d = `M${points[0][0].toFixed(4)},${points[0][1].toFixed(4)}`;
    for (let i = 1; i < points.length; i++) {
      d += `L${points[i][0].toFixed(4)},${points[i][1].toFixed(4)}`;
    }
    return d + "z";
  };

  const scaleShape = (columns, i) => (
    <path
      key={`shape-${i}`}
      d={initPath(
        columns.map((column) => [
          posX(column.angle, i / scaleCount),
          posY(column.angle, i / scaleCount),
        ])
      )}
      stroke="gray"
      strokeWidth={1}
      fill="none"
    />
  );

  const shape = (columns) => (chartData, i) =>
    (
      <path
        key={`shape-${i}`}
        d={initPath(
          columns.map((column) => [
            posX(column.angle, (chartData[column.key] - 10) / 90), // Scale from 10-100 to 0-1
            posY(column.angle, (chartData[column.key] - 10) / 90),
          ])
        )}
        strokeDasharray="5,5"
        fill="#9CFC38"
      />
    );

  const axis = () => (column, i) =>
    (
      <polyline
        key={`poly-axis-${i}`}
        points={`0,0 ${posX(column.angle, 1.1)},${posY(column.angle, 1.1)}`}
        stroke="black"
        strokeWidth="0.5"
      />
    );

  const label = () => (column) =>
    (
      <text
        key={`label-of-${column.key}`}
        x={posX(column.angle, 1.2)}
        y={posY(column.angle, 1.2)}
        dy={5}
        fill="black"
        fontSize={32}
        textAnchor="middle"
      >
        {column.key}
      </text>
    );

  const textIndicator = (i) => (
    <text
      x={-20}
      y={-((i / scaleCount) * graphSize)}
      fill="black"
      fontSize={20}
      textAnchor="middle"
    >
      {0 + i * 10} {/* Mapping 0-10 scale to 10-100 */}
    </text>
  );

  const labels = ["overall", "technical", "defensive", "tactical", "physical"];

  const columns = labels.map((key, i, arr) => ({
    key,
    angle: (Math.PI * 2 * i) / arr.length,
  }));

  const groups = [];
  for (let i = scaleCount; i >= 0; i--) {
    groups.push(<g key={`scale-${i}`}>{scaleShape(columns, i)}</g>);
  }

  groups.push(<g key="shapes">{data.map(shape(columns))}</g>);
  groups.push(<g key="labels">{columns.map(label())}</g>);

  if (options.showAxis) groups.push(<g key="axes">{columns.map(axis())}</g>);

  if (options.showIndicator) {
    for (let i = 0; i <= scaleCount; i++) {
      if (i % numberInterval === 0)
        groups.push(<g key={`indicator-${i}`}>{textIndicator(i)}</g>);
    }
  }

  return (
    <div className="flex justify-center items-center">
      <svg
        width={graphSize}
        height={graphSize}
        viewBox={`0 0 ${boxSize} ${boxSize}`}
      >
        <g transform={`translate(${centerPos},${centerPos})`}>{groups}</g>
      </svg>
    </div>
  );
};
